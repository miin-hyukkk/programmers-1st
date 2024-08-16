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

