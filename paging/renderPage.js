// renderPage.js
import { addLikeList } from "../like/addLikeList";

const likeList = JSON.parse(localStorage.getItem("likeList")) || [];

export async function renderPage({
  query,
  queryType,
  pageSize,
  currentPage,
  sort,
  searchFn,
  loadFn,
  resultsContainer,
  pagination,
  setPagination,
}) {
  try {
    let data;
    if (searchFn) {
      data = await searchFn(query, queryType, pageSize, currentPage, sort);
    } else if (loadFn) {
      data = await loadFn(queryType, pageSize, currentPage);
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
