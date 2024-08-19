export function addLikeList(tag, book, bookImg) {
  document.querySelectorAll(tag).forEach((icon) => {
    icon.addEventListener("click", function (event) {
      // 클릭된 요소가 하트 아이콘인지 확인
      if (event.target.classList.contains("fa-heart")) {
        const bookElement = this.closest(book);
        const bookData = {
          title: bookElement.dataset.title,
          author: bookElement.dataset.author,
          publisher: bookElement.dataset.publisher,
          pubDate: bookElement.dataset.pubdate,
          price: +bookElement.dataset.price,
          discount: +bookElement.dataset.pricesales,
          review: +bookElement.dataset.review,
          description: bookElement.dataset.desc,
          link: bookElement.dataset.link,
          cover: bookElement.dataset.cover,
          sales: +bookElement.dataset.sales,
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
      }
    });
  });
}
