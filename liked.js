// Get reference to the wrapper element
const wrapper = document.getElementById("wrapper");
// Retrieve liked movies from local storage

const likedMovie = JSON.parse(localStorage.getItem("likedMoviesLocal"));

function addMovieToLikedPage() {
  // Check if liked movies exist
  if (!likedMovie) return;

  for (let i = 0; i < likedMovie.length; i++) {
    // Get poster URL of the current movie
    const poster = likedMovie[i].poster;
    // Create a new movie card element
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    // Set inner HTML of the movie card with poster image and movie title
    movieCard.innerHTML = `<img class="poster" src=${poster}><b class="liked-title">${likedMovie[i].title}</b>`;
    wrapper.appendChild(movieCard);
  }
}

// Call the function to add liked movies to the page

addMovieToLikedPage();
