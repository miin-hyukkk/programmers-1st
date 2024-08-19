import { generatePaginationHtml } from "../../modules/paging/pagination.js";
import { renderPage as renderPageModule } from "../../modules/paging/renderPage.js";
import { attachSearchHandlers } from "../../../searching/searchHandlers.js";
import { addModalEventListeners } from "../../modules/modal/addModalEvent.js";
import { addLogoClickListener } from "../../modules/navigate.js";

const textInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".icon-box");
const searchToggle = document.getElementById("search-toggle");

let likeTitleElement = document.getElementById("like-book");

let likeSort = "default"; // 기본 정렬 기준
const sortButtons = document.querySelectorAll(".sort-btn");
const initicialFilter = document.querySelector(".tab-header");

let likeList = JSON.parse(localStorage.getItem("likeList")) || [];

console.log(likeList);

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
    pageSize,
    currentPage,
    likeSort,
    resultsContainer,
    setPagination,
  });
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = likeList;
    console.log("dddaa", data);
    totalResults = data.length || 0;
    likeTitleElement.parentElement.innerHTML = `<strong id="like-book">'좋아요'</strong>${totalResults}개 도서`;
    renderPageModule({
      pageSize,
      currentPage,
      likeSort,
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
    likeSort = this.getAttribute("data-sort");
    renderPageModule({
      pageSize,
      currentPage,
      likeSort,
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
  likeSort = "default";
  sortButtons.forEach((btn) => btn.classList.remove("on"));
  sortButtons[0].classList.add("on");
  renderPageModule({
    pageSize,
    currentPage,
    likeSort,
    resultsContainer,
    setPagination,
  });
});

// 모달 기능
document.addEventListener("DOMContentLoaded", () => {
  addModalEventListeners();
});

// 홈으로 이동
document.addEventListener("DOMContentLoaded", () => {
  addLogoClickListener();
});
