import axios from "axios";

export async function loadBookList(queryType, maxResults, start) {
  try {
    const response = await axios.get("http://localhost:3000/api/list", {
      params: {
        queryType,
        maxResults,
        start,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error loading book list:", error.message);
    throw new Error("An error occurred while fetching the book list");
  }
}
