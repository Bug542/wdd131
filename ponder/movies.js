// Movie information is stored in an array of objects.
const movies = [
  {
    title: "Spider-Man: Into the Spider-Verse",
    date: "Dec 14, 2018",
    description: "Miles Morales becomes the Spider-Man of his reality and crosses paths with others from the multiverse.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/spiderman.png",
    imgAlt: "Miles Morales swinging through the city",
    ages: "10+",
    genre: "Action/Adventure",
    stars: "⭐⭐⭐⭐⭐"
  },
  {
    title: "The Other Side of Heaven",
    date: "December 14, 2001",
    description: "Based on the true story of Elder John H. Groberg, a missionary in Tonga in the 1950s, this film tells a powerful story of faith, hardship, and miracles.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/heaven.png",
    imgAlt: "Poster for The Other Side of Heaven showing a missionary and tropical landscape",
    ages: "10+",
    genre: "Drama/Religious",
    stars: "⭐⭐⭐⭐"
  },
  {
    title: "Luca",
    date: "June 18, 2021",
    description: "Two sea monsters experience a life-changing summer on the Italian Riviera.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/luca.png",
    imgAlt: "Luca and Alberto standing on the beach",
    ages: "6+",
    genre: "Family/Fantasy",
    stars: "⭐⭐⭐⭐"
  },
  {
    title: "17 Miracles",
    date: "June 3, 2011",
    description: "A moving depiction of the Willie Handcart Company's journey west in 1856, focusing on the miraculous events that helped early pioneers survive one of the harshest migrations in history.",
    imgSrc: "https://wddbyui.github.io/wdd131/images/miracles.jpg",
    imgAlt: "Movie poster for 17 Miracles showing handcart pioneers walking through snow",
    ages: "12+",
    genre: "Historical/Religious",
    stars: "⭐⭐⭐⭐"
  }
];

// A template literal describes one movie's HTML.
function movieTemplate(movie) {
  return `
    <article class="movie">
      <h2>${movie.title}</h2>
      <img src="${movie.imgSrc}" alt="${movie.imgAlt}" loading="lazy">
      <p class="release"><strong>Release Date:</strong> ${movie.date}</p>
      <p class="age"><strong>Recommended Age:</strong> ${movie.ages}</p>
      <p class="genre"><strong>Genre:</strong> ${movie.genre}</p>
      <p class="rating">
        <strong>Rating:</strong>
        <span role="img" aria-label="${[...movie.stars].length} out of 5 stars">${movie.stars}</span>
      </p>
      <p class="description">${movie.description}</p>
    </article>
  `;
}

// forEach displays every movie without hard-coding reviews into the HTML file.
const movieList = document.querySelector("#movie-list");
movies.forEach((movie) => {
  movieList.insertAdjacentHTML("beforeend", movieTemplate(movie));
});
