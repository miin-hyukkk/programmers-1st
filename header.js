// header.js
import './header.css';

export function createHeader() {
  const headerHTML = `
        <div class="header-box">
            <header>
                <img class="logo" src="../img/logo.png" alt="logo" />
                <div class="search-container">
                    <div class="search-menu">
                        <span id="search-toggle">도서명으로 검색</span>
                        <i class="fa-solid fa-caret-down" id="toggle-icon"></i>
                    </div>
                    <input
                        class="searchInput"
                        type="text"
                        placeholder="검색어를 입력하세요"
                    />
                    <div class="icon-box">
                        <i class="fa-solid fa-magnifying-glass" id="search-icon"></i>
                    </div>
                    <ul id="search-options">
                        <li>도서명으로 검색</li>
                        <li>저자명으로 검색</li>
                    </ul>
                </div>
                <div class="like-btn">
                    <i class="fa-regular fa-heart"></i>
                    <p>찜 목록</p>
                </div>
            </header>
        </div>
    `;

  // Create a container for the header
  const container = document.createElement("div");
  container.innerHTML = headerHTML;

  // Return the container element
  return container.firstElementChild;
}
