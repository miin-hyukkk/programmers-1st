import { loadBookList } from "./api/load";
import { searchBook, searchAuthor } from "./api/search";
import { addLikeList } from "./like/addLikeList";
import { moveLikePage } from "./like/moveLikePage";

const searchMenu = document.querySelector(".search-menu");
const searchOptions = document.getElementById("search-options");
const searchToggle = document.getElementById("search-toggle");
const toggleIcon = document.getElementById("toggle-icon");
const textInput = document.querySelector(".searchInput");
const searchIcon = document.querySelector(".icon-box");

const itemNewAllBtn = document.getElementById("more-ItemNewAll-btn");
const itemNewSpecialBtn = document.getElementById("more-ItemNewSpecial-btn");
const blogBestBtn = document.getElementById("more-BlogBest-btn");

const likeList = JSON.parse(localStorage.getItem("likeList")) || [];

//좋아요페이지 이동
document.addEventListener("DOMContentLoaded", () => moveLikePage);

// 검색어 종류 설정
searchMenu.addEventListener("click", function () {
  console.log(searchMenu);
  if (searchOptions.classList.contains("show")) {
    searchOptions.classList.remove("show");
    toggleIcon.classList.remove("fa-caret-up");
    toggleIcon.classList.add("fa-caret-down");
  } else {
    searchOptions.classList.add("show");
    toggleIcon.classList.remove("fa-caret-down");
    toggleIcon.classList.add("fa-caret-up");
  }
});
searchOptions.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    console.log(event.target.tagName);
    console.log(event.target.innerText);

    searchToggle.textContent = event.target.innerText;
    searchOptions.classList.remove("show");
    toggleIcon.classList.remove("fa-caret-up");
    toggleIcon.classList.add("fa-caret-down");
  }
});
document.addEventListener("click", function (event) {
  if (
    !searchOptions.contains(event.target) &&
    !searchMenu.contains(event.target)
  ) {
    if (searchOptions.classList.contains("show")) {
      searchOptions.classList.remove("show");
      toggleIcon.classList.remove("fa-caret-up");
      toggleIcon.classList.add("fa-caret-down");
    }
  }
});

// 검색 기능
async function searchFn(query, queryType) {
  if (queryType === "도서명으로 검색") {
    const searchBookByTitle = await searchBook(query, "Title", 10, 1);
    return searchBookByTitle;
  } else {
    const searchBookByAuthor = await searchAuthor(query, "Author", 10, 1);
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
    localStorage.setItem("searchQuery", textInput.value);
  }
}
textInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") performSearch();
});
searchIcon.addEventListener("click", function () {
  performSearch();
});

// section1
async function initializeSwiper() {
  try {
    const bestBooks = await loadBookList("Bestseller", 10, 1);
    console.log("Bestseller", bestBooks);
    const mainSwiperWrapper = document.querySelector(
      ".swiper-wrapper.mainSlideWrapper"
    );
    const subSwiperWrapper = document.querySelector(
      ".swiper-wrapper.subSlideWrapper"
    );
    const mainSlidesHtml = bestBooks.item
      .map((book) => {
        const isLiked = likeList.some(
          (likedBook) => likedBook.title === book.title
        );
        return generateSection1BookHTML(book, isLiked);
      })
      .join("");

    const subSlidesHtml = bestBooks.item
      .slice(1)
      .map((book) => {
        return `
        <div class="swiper-slide">
          <img id="sub" src="${book.cover || "../img/exbook.png"}" alt="${
          book.title
        }" />
        </div>
      `;
      })
      .join("");
    mainSwiperWrapper.innerHTML = mainSlidesHtml;
    subSwiperWrapper.innerHTML = subSlidesHtml;
    addLikeList("#box .overlay i", "#box", ".best");
  } catch (error) {
    console.error("Failed to load book list:", error);
  }
}
window.onload = initializeSwiper;

//section2
async function loadSection2() {
  const newBooks = await loadBookList("ItemNewAll", 5, 1);
  const bookList = document.getElementById("itemNewAllList");
  const bookListHtml = newBooks.item
    .map((book) => {
      const isLiked = likeList.some(
        (likedBook) => likedBook.title === book.title
      );
      return generateBookHtml(book, isLiked, "book", "bookImg");
    })
    .join("");
  bookList.innerHTML = bookListHtml;
  addLikeList("#book .overlay i", "#book", ".bookImg");
}
document.addEventListener("DOMContentLoaded", loadSection2);

//section3
async function loadSection3() {
  const newBooks = await loadBookList("ItemNewSpecial", 4, 1);
  const bookList = document.querySelector(".right-box");
  const bookListHtml = newBooks.item
    .map((book) => {
      const isLiked = likeList.some(
        (likedBook) => likedBook.title === book.title
      );
      return generateBookHtml(book, isLiked, "book3", "sec3Img");
    })
    .join("");
  bookList.innerHTML = bookListHtml;
  addLikeList("#book3 .overlay i", "#book3", ".sec3Img");
}
document.addEventListener("DOMContentLoaded", loadSection3);

//section4
async function loadSection4() {
  const newBooks = await loadBookList("BlogBest", 5, 1);
  const bookList = document.getElementById("blogBookList");
  const bookListHtml = newBooks.item
    .map((book) => {
      const isLiked = likeList.some(
        (likedBook) => likedBook.title === book.title
      );
      return generateBookHtml(book, isLiked, "book", "bookImg");
    })
    .join("");
  bookList.innerHTML = bookListHtml;
}

document.addEventListener("DOMContentLoaded", loadSection4);

//더보기 기능 구현
function moveUrl(queryType) {
  const url = new URL("catelog.html", window.location.origin);
  url.searchParams.set("queryType", queryType);
  window.location.href = url.toString();
  localStorage.removeItem("searchQuery");
}
itemNewAllBtn.addEventListener("click", () => {
  moveUrl("ItemNewAll");
});
itemNewSpecialBtn.addEventListener("click", () => {
  moveUrl("ItemNewSpecial");
});
blogBestBtn.addEventListener("click", () => {
  moveUrl("BlogBest");
});

//섹션 2,3,4에 사용되는 html
function generateBookHtml(book, isLiked, divId, img) {
  return `
    <div id=${divId} data-title="${book.title}" data-author="${
    book.author
  }" data-price="${book.priceStandard}" data-sales="${
    book.salesPoint
  }" data-review="${book.customerReviewRank}">
      <img class=${img} src="${book.cover || "../img/exbook.png"}" alt="${
    book.title
  }" />
      <p>${book.title}</p>
      <p>${book.author}</p>
      <div class="overlay">
        <i class="fa-${isLiked ? "solid" : "regular"} fa-heart"></i>
        <i class="fa-solid fa-circle-info"></i>
      </div>
    </div>`;
}
function generateSection1BookHTML(book, isLiked) {
  return `
    <div class="swiper-slide" id="box" data-title="${
      book.title
    }" data-author="${book.author}" data-price="${
    book.priceStandard
  }" data-sales="${book.salesPoint}" data-review="${book.customerReviewRank}">
      <img id="best" class="best" src="${
        book.cover || "../img/exbook.png"
      }" alt="${book.title}" >
        <div class="overlay">
          <i class="fa-${isLiked ? "solid" : "regular"} fa-heart"></i>
          <i class="fa-solid fa-circle-info"></i>
        </div>
      </>
      <div id="desc">
        <h2>${book.title}</h2>
        <p id="author">${book.author}</p>
        <p id="price">${book.priceSales}</p>
        <span>${book.description || "No description available"}</span>
      </div>
    </div>
  `;
}
