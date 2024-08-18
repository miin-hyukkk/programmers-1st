// renderPage.js

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
        .map(
          (item) => `
                  <div id="book">
                      <img src="${item.cover}" alt="${item.title}" />
                      <p>${item.title}</p>
                      <p>${item.author}</p>
                  </div>
              `
        )
        .join("");
      setPagination();
    } else {
      resultsContainer.innerHTML =
        "<p>데이터를 불러오는 중 오류가 발생했습니다.</p>";
    }
  } catch (error) {
    console.error("페이지 렌더링 중 오류 발생:", error);
  }
}
