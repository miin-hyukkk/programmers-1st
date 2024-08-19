// renderPage.js
import { addLikeList } from "../like/addLikeList";

let likeList = JSON.parse(localStorage.getItem("likeList")) || [];

export async function renderPage({
  query,
  queryType,
  pageSize,
  currentPage,
  sort,
  likeSort,
  searchFn,
  loadFn,
  resultsContainer,
  setPagination,
}) {
  try {
    let data;
    let likeData;
    if (searchFn) {
      data = await searchFn(query, queryType, pageSize, currentPage, sort);
    } else if (loadFn) {
      data = await loadFn(queryType, pageSize, currentPage);
    } else {
      if (likeSort === "review")
        likeList.sort((a, b) => Number(b.review) - Number(a.review));
      else if (likeSort === "priceH")
        likeList.sort((a, b) => Number(b.price) - Number(a.price));
      else if (likeSort === "priceL")
        likeList.sort((a, b) => Number(a.price) - Number(b.price));
      else if (likeSort === "sales")
        likeList.sort((a, b) => Number(b.sales) - Number(a.sales));
      else if (likeSort === "title")
        likeList.sort((a, b) => a.title.localeCompare(b.title));
      else if (likeSort === "default")
        likeList = JSON.parse(localStorage.getItem("likeList"));

      likeData = likeList.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      );
    }
    if (data) {
      resultsContainer.innerHTML = data.item
        .map((book) => {
          const isLiked = likeList.some(
            (likedBook) => likedBook.title === book.title
          );
          return generateBookHtml(book, isLiked, "book", "bookImg");
        })
        .join("");

      setPagination();
      addLikeList("#book .overlay i", "#book", ".bookImg");
    } else if (likeData) {
      resultsContainer.innerHTML = likeData
        .map((book) => {
          const isLiked = likeList.some(
            (likedBook) => likedBook.title === book.title
          );
          return generateLikeBookHtml(book, isLiked, "book", "bookImg");
        })
        .join("");
      setPagination();
      addLikeList("#book .overlay i", "#book", ".bookImg");
    } else {
      resultsContainer.innerHTML =
        "<p>데이터를 불러오는 중 오류가 발생했습니다.</p>";
    }
  } catch (error) {
    console.error("페이지 렌더링 중 오류 발생:", error);
  }
}
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
function generateLikeBookHtml(book, isLiked, divId, img) {
  return `
    <div id=${divId} data-title="${book.title}" data-author="${
    book.author
  }" data-price="${book.price}" data-sales="${book.sales}" data-review="${
    book.review
  }">
      <img class=${img} src="${book.src || "../img/exbook.png"}" alt="${
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
