// searchHandlers.js
import { searchFn } from './searchFn.js';

export function performSearch(textInput, searchToggle) {
  const query = textInput.value.trim();
  const queryType = searchToggle.textContent;
  if (query) {
    searchFn(query, queryType);
    const url = new URL("search-result.html", window.location.origin);
    url.searchParams.set("query", query);
    url.searchParams.set("queryType", queryType);
    window.location.href = url.toString();
    localStorage.setItem("searchQuery", textInput.value);
  }
}

export function attachSearchHandlers(textInput, searchIcon, searchToggle) {
  textInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") performSearch(textInput, searchToggle);
  });

  searchIcon.addEventListener("click", function () {
    performSearch(textInput, searchToggle);
  });
}
