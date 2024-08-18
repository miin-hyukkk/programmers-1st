import { generatePaginationHtml } from "./paging/pagination";
import { renderPage as renderPageModule } from "./paging/renderPage";
import { searchFn } from "./searching/searchFn";
import { attachSearchHandlers } from "./searching/searchHandlers";

const textInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".icon-box");
const searchToggle = document.getElementById("search-toggle");

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const query = params.get("query");
const queryType = params.get("queryType");
let sort = "Accuracy"; // 기본 정렬 기준
const sortButtons = document.querySelectorAll(".sort-btn");
const initicialFilter = document.querySelector(".tab-header");

// 검색 핸들러 연결
attachSearchHandlers(textInput, searchIcon, searchToggle);

// 페이지네이션 및 페이지 렌더링
const resultsContainer = document.querySelector(".book-list");
let page = 1;
let currentPage = 1;
let totalResults = 0;
let groupSize = 5;
let pageSize = 10;

async function setPagination() {
  const paginationHtml = generatePaginationHtml({
    page,
    currentPage,
    groupSize,
    totalResults,
    pageSize,
    onPageChange: "movePage",
  });
  document.querySelector(".pgCon").innerHTML = paginationHtml;
}

window.movePage = (pageNum) => {
  page = pageNum;
  currentPage = pageNum;
  console.log(page, currentPage);
  renderPageModule({
    query,
    queryType,
    pageSize,
    currentPage,
    sort,
    searchFn,
    resultsContainer,
    pagination: setPagination,
    setPagination,
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await searchFn(query, queryType, 10, 1, sort);
    console.log("dddaa", data);

    document.getElementById("book-title").textContent = `'${query}'`;
    const savedQuery = localStorage.getItem("searchQuery");
    if (savedQuery) textInput.value = query;

    totalResults = data.totalResults || 100;

    renderPageModule({
      query,
      queryType,
      pageSize,
      currentPage,
      sort,
      searchFn,
      resultsContainer,
      pagination: setPagination,
      setPagination,
    });
  } catch (error) {
    console.error("페이지 초기화 중 오류 발생:", error);
  }
});

// 필터링 기능
sortButtons.forEach((button) => {
  button.addEventListener("click", function () {
    sortButtons.forEach((btn) => btn.classList.remove("on"));
    this.classList.add("on");
    sort = this.getAttribute("data-sort");
    renderPageModule({
      query,
      queryType,
      pageSize,
      currentPage,
      sort,
      searchFn,
      resultsContainer,
      pagination: setPagination,
      setPagination,
    });
    currentPage = 1;
    page = 1;
  });
});

initicialFilter.addEventListener("click", function () {
  currentPage = 1;
  page = 1;
  sort = "Accuracy";
  sortButtons.forEach((btn) => btn.classList.remove("on"));
  sortButtons[0].classList.add("on");
  renderPageModule({
    query,
    queryType,
    pageSize,
    currentPage,
    sort,
    searchFn,
    resultsContainer,
    pagination: setPagination,
    setPagination,
  });
});
