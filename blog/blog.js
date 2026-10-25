"use strict";

const bookList = document.querySelector("#archive");
const searchToggle = document.querySelector("#search-toggle");
const searchForm = document.querySelector("#search-form");
const bookSearch = document.querySelector("#book-search");
const searchMessage = document.querySelector("#search-message");

document.querySelector("#current-year").textContent = new Date().getFullYear();

// Turn each book object from articles.js into an accessible article.
function articleTemplate(book) {
  const article = document.createElement("article");
  article.className = "book-review";

  const details = document.createElement("div");
  details.className = "book-details";

  const date = document.createElement("p");
  const time = document.createElement("time");
  time.dateTime = new Date(book.date).toISOString().slice(0, 10);
  time.textContent = book.date;
  date.append(time);

  const ages = document.createElement("p");
  ages.textContent = book.ages;
  const genre = document.createElement("p");
  genre.textContent = book.genre;
  const rating = document.createElement("p");
  rating.className = "rating";
  rating.setAttribute("aria-label", book.stars.length === 0 ? "Unrated" : book.stars.split("⭐").length - 1 + " out of 5 stars");
  rating.textContent = book.stars;
  details.append(date, ages, genre, rating);

  const content = document.createElement("div");
  content.className = "book-content";
  const title = document.createElement("h2");
  title.id = "book-title-" + book.id;
  title.textContent = book.title;
  article.setAttribute("aria-labelledby", title.id);
  const cover = document.createElement("img");
  cover.className = "book-cover";
  cover.src = book.imgSrc;
  cover.alt = book.imgAlt;
  cover.width = 200;
  cover.loading = "lazy";
  const description = document.createElement("p");
  description.textContent = book.description;
  content.append(title, cover, description);
  article.append(details, content);
  return article;
}

// All content is generated from articles.js, not hard-coded in index.html.
function displayArticles(books) {
  bookList.replaceChildren();
  if (!books.length) {
    const empty = document.createElement("p");
    empty.textContent = "No matching book reviews found.";
    bookList.append(empty);
    return;
  }
  books.forEach(book => bookList.append(articleTemplate(book)));
}

displayArticles(articles);

searchToggle.addEventListener("click", () => {
  const opening = searchForm.hidden;
  searchForm.hidden = !opening;
  searchToggle.setAttribute("aria-expanded", String(opening));
  if (opening) bookSearch.focus();
  else {
    bookSearch.value = "";
    searchMessage.textContent = "";
    displayArticles(articles);
  }
});

searchForm.addEventListener("submit", event => {
  event.preventDefault();
  const query = bookSearch.value.trim().toLowerCase();
  const results = articles.filter(book =>
    book.title.toLowerCase().includes(query) ||
    book.genre.toLowerCase().includes(query) ||
    book.description.toLowerCase().includes(query)
  );
  displayArticles(results);
  searchMessage.textContent = query
    ? results.length + (results.length === 1 ? " matching review found." : " matching reviews found.")
    : "Showing all book reviews.";
});
