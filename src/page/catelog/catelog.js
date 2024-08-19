import { loadBookList } from "../../api/load.js";
import { generatePaginationHtml } from "../../modules/paging/pagination.js";
import { renderPage as renderPageModule } from "../../modules/paging/renderPage.js";
import { attachSearchHandlers } from "../../../searching/searchHandlers.js";
import { moveLikePage } from "../../modules/like/moveLikePage.js";
import { addModalEventListeners } from "../../modules/modal/addModalEvent.js";
import { addLogoClickListener } from "../../modules/navigate.js";

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
let queryType = params.get("queryType");
let queryTypeElement = document.getElementById("queryType");

const sortButtons = document.querySelectorAll(".sort-btn");
const initicialFilter = document.querySelector(".tab-header");

async function loadFn(queryType, max, min) {
  const searchBookByTitle = await loadBookList(queryType, max, min);
  return searchBookByTitle;
}

//좋아요페이지 이동
document.addEventListener("DOMContentLoaded", moveLikePage);

// 검색 핸들러 연결
const textInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".icon-box");
const searchToggle = document.getElementById("search-toggle");
attachSearchHandlers(textInput, searchIcon, searchToggle);

// 페이지네이션 및 페이지 렌더링
const resultsContainer = document.querySelector(".book-list");
let page = 1;
let currentPage = 1;
let totalResults = 0;
let groupSize = 5;
let pageSize = 10;
let queryTypeText;

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
  renderPageModule({
    queryType,
    pageSize,
    currentPage,
    loadFn,
    resultsContainer,
    setPagination,
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await loadFn(queryType, 10, 1);
    sortButtons.forEach((btn) => {
      const buttonSort = btn.getAttribute("data-sort");
      if (buttonSort === queryType) {
        btn.classList.add("on");
      } else {
        btn.classList.remove("on");
      }
    });

    totalResults = data.totalResults || 100;

    changeHead(queryType);

    renderPageModule({
      queryType,
      pageSize,
      currentPage,
      loadFn,
      resultsContainer,
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
    queryType = this.getAttribute("data-sort");
    changeHead(queryType);

    renderPageModule({
      queryType,
      pageSize,
      currentPage,
      loadFn,
      resultsContainer,
      setPagination,
    });
    currentPage = 1;
    page = 1;
  });
});

initicialFilter.addEventListener("click", function () {
  currentPage = 1;
  page = 1;
  queryType = "ItemNewAll";
  sortButtons.forEach((btn) => btn.classList.remove("on"));
  sortButtons[0].classList.add("on");
  changeHead(queryType);

  renderPageModule({
    queryType,
    pageSize,
    currentPage,
    loadFn,
    resultsContainer,
    setPagination,
  });
});

function changeHead(queryType) {
  queryTypeElement = document.getElementById("queryType");
  if (queryType === "ItemNewAll") queryTypeText = "신간 전체";
  else if (queryType === "ItemNewSpecial") queryTypeText = "주목할 만한 신간";
  else if (queryType === "BlogBest") queryTypeText = "블로그 베스트셀러";
  else queryTypeText = "베스트셀러";

  queryTypeElement.innerHTML = `'${queryTypeText}'`;
  queryTypeElement.parentElement.innerHTML = `<strong id="queryType">'${queryTypeText}'</strong>${totalResults}개 도서`;
}

// 모달 기능
document.addEventListener("DOMContentLoaded", () => {
  addModalEventListeners();
});

// 홈으로 이동
document.addEventListener("DOMContentLoaded", () => {
  addLogoClickListener();
});
