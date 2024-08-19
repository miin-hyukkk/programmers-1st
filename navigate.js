export function addLogoClickListener() {
  const logo = document.querySelector(".logo");
  if (logo) {
    logo.addEventListener("click", () => {
      window.location.href = "/"; // 홈 페이지로 이동
    });
  }
}
