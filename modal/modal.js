export function generateModalHtml(bookData) {
  return `
      <div id="infoModal" class="modal">
        <div class="modal-content">
          <div class="info-wrapper">
            <img class="modalBook" src="${
              bookData.cover || "./img/exbook.png"
            }" alt="${bookData.title}" />
            <div class="info">
              <p id="modal-title">[국내도서] ${bookData.title}</p>
              <p id="modal-author">${bookData.author}</p>
              <div id="pub-box">
                <p id="modal-publisher">${bookData.publisher}</p>
                <p id="modal-pubDate">${bookData.pubDate}</p>
              </div>
              <div id="price-box">
                <p id="modal-discount">${
                  bookData.discount === bookData.price
                    ? ""
                    : `${Math.round(
                        100 - (bookData.discount / bookData.price) * 100
                      )}%`
                }</p>
                <p id="modal-price">${
                  bookData.discount === bookData.price
                    ? `${bookData.price.toLocaleString()}원`
                    : `${bookData.discount.toLocaleString()}원`
                }</p>
              </div>
              <p id="modal-review">★ ${bookData.review}</p>
              <p id="modal-description">${
                bookData.description === ""
                  ? "우측 하단 링크를 통해 더 많은 정보를 만나보실 수 있어요."
                  : bookData.description
              }</p>
            </div>
            <span class="close">&times;</span>
          </div>
          <div class="link">알라딘으로 이동 -></div>
        </div>
      </div>`;
}

export function openModal(bookData) {
  const modalHtml = generateModalHtml(bookData);
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Close modal
  document
    .querySelector(".modal .close")
    .addEventListener("click", function () {
      document.querySelector(".modal").remove();
    });

  // Close modal on outside click
  window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
      document.querySelector(".modal").remove();
    }
  });

  // Redirect on link click
  document.querySelector(".modal .link").addEventListener("click", function () {
    window.location.href = bookData.link;
  });
}
