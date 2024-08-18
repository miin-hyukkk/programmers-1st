import { searchBook, searchAuthor } from "./api/search";

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

// 검색 기능
async function searchFn(query, queryType, max, min, sort) {
  if (queryType === "도서명으로 검색") {
    const searchBookByTitle = await searchBook(query, "Title", max, min, sort);
    return searchBookByTitle;
  } else {
    const searchBookByAuthor = await searchAuthor(
      query,
      "Author",
      max,
      min,
      sort
    );
    return searchBookByAuthor;
  }
}
function performSearch() {
  const query = textInput.value.trim();
  const queryType = searchToggle.textContent;
  if (query) {
    searchFn(query, queryType);
    const url = new URL("search-result.html", window.location.origin);
    url.searchParams.set("query", query);
    url.searchParams.set("queryType", queryType);
    window.location.href = url.toString();
  }
}
textInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") performSearch();
});
searchIcon.addEventListener("click", function () {
  performSearch();
});

// 페이지네이션 기능
const resultsContainer = document.querySelector(".book-list");
let page = 1;
let currentPage = 1;
let totalResults = 0;
let groupSize = 5;
let pageSize = 10;
let paginationHtml = "";
async function renderPage(currentPage, sort) {
  try {
    const data = await searchFn(query, queryType, 10, currentPage, sort);
    if (data) {
      resultsContainer.innerHTML = data.item
        .map(
          (item) => `
                <div id="book">
                    <img src="${item.cover}" alt="${item.title}" />
                    <p>${item.title}</p>
                    <p>${item.author}</p>
                </div>
            `
        )
        .join("");
      pagination();
    } else {
      resultsContainer.innerHTML =
        "<p>데이터를 불러오는 중 오류가 발생했습니다.</p>";
    }
  } catch (error) {
    console.error("페이지 렌더링 중 오류 발생:", error);
  }
}

window.movePage = (pageNum) => {
  page = pageNum;
  currentPage = pageNum;
  console.log(page, currentPage);

  renderPage(page, sort);
};
const pagination = () => {
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = Math.min(
    Math.ceil(totalResults / pageSize),
    pageGroup * groupSize
  );
  let firstPage = (pageGroup - 1) * groupSize + 1;
  let totalPage = Math.ceil(totalResults / pageSize);

  paginationHtml = `<button class="next" ${
    pageGroup === 1 ? "disabled" : ""
  } onClick='movePage(1)'><i class="fa-solid fa-backward"></i></button>`;

  paginationHtml += `<button class="next" ${
    pageGroup === 1 ? "disabled" : ""
  } onClick='movePage(${
    currentPage - 1
  })'><i class="fa-solid fa-caret-left"></i></button>`;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHtml += `<button class='${
      i === currentPage ? "on" : ""
    }' onClick='movePage(${i})'>${i}</button>`;
  }

  paginationHtml += `<button class="next" ${
    pageGroup * groupSize >= totalPage ? "disabled" : ""
  } onClick='movePage(${
    currentPage + 1
  })'><i class="fa-solid fa-caret-right"></i></button>`;

  paginationHtml += `<button class="next" ${
    pageGroup * groupSize >= totalPage ? "disabled" : ""
  } onClick='movePage(${totalPage})'><i class="fa-solid fa-forward"></i></button>`;

  document.querySelector(".pgCon").innerHTML = paginationHtml;
};

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const query = new URLSearchParams(window.location.search).get("query");
    const queryType = new URLSearchParams(window.location.search).get(
      "queryType"
    );

    const data = await searchFn(query, queryType, 10, 1, sort);
    console.log("dddaa", data);
    totalResults = data.totalResults || 100;

    renderPage(currentPage, sort);
    pagination();
  } catch (error) {
    console.error("페이지 초기화 중 오류 발생:", error);
  }
});

//필터링 기능

sortButtons.forEach((button) => {
  button.addEventListener("click", function () {
    sortButtons.forEach((btn) => btn.classList.remove("on"));
    this.classList.add("on");
    sort = this.getAttribute("data-sort");
    renderPage(1, sort);
    currentPage = 1;
    page = 1;
  });
});

initicialFilter.addEventListener("click", function () {
  currentPage = 1;
  page = 1;
  sort = "Accuracy";
  console.log("hihihihi");
  sortButtons.forEach((btn) => btn.classList.remove("on"));
  sortButtons[0].classList.add("on");
  renderPage(1, sort);
});
