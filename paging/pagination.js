// pagination.js

export function generatePaginationHtml({
  page,
  currentPage,
  groupSize,
  totalResults,
  pageSize,
  onPageChange,
}) {
  let pageGroup = Math.ceil(page / groupSize);
  let lastPage = Math.min(
    Math.ceil(totalResults / pageSize),
    pageGroup * groupSize
  );
  console.log(totalResults, pageSize);

  let firstPage = (pageGroup - 1) * groupSize + 1;
  let totalPage = Math.ceil(totalResults / pageSize);

  let paginationHtml = `<button class="next" ${
    pageGroup === 1 ? "disabled" : ""
  } onClick='${onPageChange}(1)'><i class="fa-solid fa-backward"></i></button>`;

  paginationHtml += `<button class="next" ${
    pageGroup === 1 ? "disabled" : ""
  } onClick='${onPageChange}(${
    currentPage - 1
  })'><i class="fa-solid fa-caret-left"></i></button>`;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHtml += `<button class='${
      i === currentPage ? "on" : ""
    }' onClick='${onPageChange}(${i})'>${i}</button>`;
  }

  paginationHtml += `<button class="next" ${
    pageGroup * groupSize >= totalPage ? "disabled" : ""
  } onClick='${onPageChange}(${
    currentPage + 1
  })'><i class="fa-solid fa-caret-right"></i></button>`;

  paginationHtml += `<button class="next" ${
    pageGroup * groupSize >= totalPage ? "disabled" : ""
  } onClick='${onPageChange}(${totalPage})'><i class="fa-solid fa-forward"></i></button>`;

  return paginationHtml;
}
