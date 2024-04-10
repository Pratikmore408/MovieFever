// Retrieve elements from the DOM
const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");
const addToLiked = document.querySelector("#add-to-liked");

console.log("script lodded");

// Function to load movies from the API
async function loadMovies(findTitle) {
  const URL = `https://omdbapi.com/?s=${findTitle}&page=1&apikey=9fa44dd7`;
  const res = await fetch(`${URL}`);
  const data = await res.json();
  if (data.Response == "True") displayMovieList(data.Search);
}

// Function to search for movies
function findMovies() {
  let findTitle = movieSearchBox.value.trim();
  if (findTitle.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(findTitle);
  } else {
    searchList.classList.add("hide-search-list");
  }
}

// Function to display list of movies
function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let idx = 0; idx < movies.length; idx++) {
    let movieListItem = document.createElement("div");
    movieListItem.dataset.id = movies[idx].imdbID;
    movieListItem.classList.add("search-list-item");
    if (movies[idx].Poster != "N/A") moviePoster = movies[idx].Poster;
    else moviePoster = "image_not_found.png";

    movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

// Function to load movie details when clicked
function loadMovieDetails() {
  const searchListMovies = searchList.querySelectorAll(".search-list-item");
  searchListMovies.forEach((movie) => {
    movie.addEventListener("click", async () => {
      searchList.classList.add("hide-search-list");
      movieSearchBox.value = "";
      const result = await fetch(
        `https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9fa44dd7`
      );
      const movieDetails = await result.json();
      displayMovieDetails(movieDetails);
    });
  });
}

// Function to display movie details
function displayMovieDetails(details) {
  resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${
          details.Poster != "N/A" ? details.Poster : "image_not_found.png"
        }" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year"><b>year</b>: ${details.Year}</li>
            <li class = "rated"><b>Ratings</b>: ${details.Rated}</li>
            <li class = "released"><b>Released</b>: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
        <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
        <p class = "language"><b>Language:</b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${
          details.Awards
        }</p>
    </div>
    `;
}

// Array to store liked movies
const likedMovies = [];

// Event listener for adding a movie to liked list
addToLiked.addEventListener("click", function () {
  const likedMovieTitle = document.querySelector(".movie-title").innerText;
  const likedMoviePoster = document.querySelector(".movie-poster img").src;
  const likedMovie = {
    title: likedMovieTitle,
    poster: likedMoviePoster,
  };
  likedMovies.push(likedMovie);
  localStorage.setItem("likedMoviesLocal", JSON.stringify(likedMovies));
});

// Event listener to hide search list on click outside
window.addEventListener("click", (event) => {
  if (event.target.className != "form-control") {
    searchList.classList.add("hide-search-list");
  }
});
