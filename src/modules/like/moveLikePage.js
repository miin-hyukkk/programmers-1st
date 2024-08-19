export function moveLikePage() {
  document.querySelector(".like-btn").addEventListener("click", function () {
    const url = new URL("src/page/like-list/likelist.html", window.location.origin);
    window.location.href = url.toString();
  });
}
