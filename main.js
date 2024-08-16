import { loadBookList } from "./api/load";

const searchMenu = document.querySelector(".search-menu");
const searchOptions = document.getElementById("search-options");
const searchToggle = document.getElementById("search-toggle");
const toggleIcon = document.getElementById("toggle-icon");

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
        return `
        <div class="swiper-slide" id="box">
          <img id="best" src="${book.cover || "../img/exbook.png"}" alt="${
          book.title
        }" />
          <div id="desc">
            <h2>${book.title}</h2>
            <p id="author">${book.author}</p>
            <p id="price">${book.priceSales}</p>
            <span>${book.description || "No description available"}</span>
          </div>
        </div>
      `;
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
  } catch (error) {
    console.error("Failed to load book list:", error);
  }
}
window.onload = initializeSwiper;


