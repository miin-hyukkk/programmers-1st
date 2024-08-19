export function addLikeList(tag, book, bookImg) {
  document.querySelectorAll(tag).forEach((icon) => {
    icon.addEventListener("click", function () {
      const bookElement = this.closest(book);
      const bookData = {
        src: bookElement.querySelector(bookImg).src,
        title: bookElement.getAttribute("data-title"),
        author: bookElement.getAttribute("data-author"),
        price: bookElement.getAttribute("data-price"),
        sales: bookElement.getAttribute("data-sales"),
        review: bookElement.getAttribute("data-review"),
      };
      let likeList = JSON.parse(localStorage.getItem("likeList")) || [];

      // 중복 체크 및 추가
      const isBookInList = likeList.some(
        (item) => item.title === bookData.title
      );
      if (!isBookInList) {
        likeList.push(bookData);
        localStorage.setItem("likeList", JSON.stringify(likeList));
        this.classList.remove("fa-regular");
        this.classList.add("fa-solid");
      } else {
        likeList = likeList.filter((item) => item.title !== bookData.title);
        localStorage.setItem("likeList", JSON.stringify(likeList));
        this.classList.remove("fa-solid");
        this.classList.add("fa-regular");
      }

      if (window.location.pathname === "/likelist.html") {
        location.reload();
      }
    });
  });
}
