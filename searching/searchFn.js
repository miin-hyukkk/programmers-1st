// searchFn.js
import { searchBook, searchAuthor } from "../api/search";

export async function searchFn(query, queryType, max, min, sort) {
  if (queryType === "도서명으로 검색") {
    const searchBookByTitle = await searchBook(query, "Title", max, min, sort);
    return searchBookByTitle;
  } else {
    const searchBookByAuthor = await searchAuthor(query, "Author", max, min, sort);
    return searchBookByAuthor;
  }
}
