"use strict";

// Keep the footer date current.
document.querySelector("#current-year").textContent = new Date().getFullYear();

// Make the navigation Search control usable and keyboard accessible.
const searchToggle = document.querySelector("#search-toggle");
const searchForm = document.querySelector("#search-form");
const bookSearch = document.querySelector("#book-search");
const searchMessage = document.querySelector("#search-message");

searchToggle.addEventListener("click", () => {
  const opening = searchForm.hidden;
  searchForm.hidden = !opening;
  searchToggle.setAttribute("aria-expanded", String(opening));

  if (opening) {
    bookSearch.focus();
  } else {
    searchMessage.textContent = "";
  }
});

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = bookSearch.value.trim().toLowerCase();
  const title = document.querySelector("#magyk-title").textContent.toLowerCase();

  if (!query) {
    searchMessage.textContent = "Enter a book title to search.";
  } else if (title.includes(query)) {
    searchMessage.textContent = "Found: Septimus Heap Book One: Magyk.";
    document.querySelector("#archive").scrollIntoView();
  } else {
    searchMessage.textContent = "No matching books found yet.";
  }
});
