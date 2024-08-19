import { openModal } from "./modal.js";

export function addModalEventListeners() {
  document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("info-icon")) {
      const bookElement = event.target.closest("#book, #book3, #box");
      console.log("bookE", bookElement);

      if (!bookElement) return;

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
      };

      openModal(bookData);
    }
  });
}
