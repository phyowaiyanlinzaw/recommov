document.addEventListener("DOMContentLoaded", () => {
  const genreSelect = document.getElementById("genre");
  const moviesList = document.getElementById("movies");
  const submitButton = document.getElementById("submit");
  const errorDiv = document.getElementById("error");
  const yearSelect = document.getElementById("year");

  async function getMovies() {
    // Check if genre is selected
    if (genreSelect.value === "") {
      errorDiv.innerHTML = "Please select a genre";
      return;
    }

    // Clear error message
    errorDiv.innerHTML = "";
    errorDiv.style.display = "none";

    const genreValue = genreSelect.value;

    const moviesUrl = `https://api.themoviedb.org/3/discover/movie?api_key=df746a13d4d785eb8692f7be0d6440a3&with_genres=${genreValue}&primary_release_year=${yearSelect.value}`;

    try {
      const response = await fetch(moviesUrl);

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = await response.json();

      // Filter movies with IMDb rating 7 or higher
      data.results = data.results.filter((movie) => movie.vote_average >= 7);

      shuffle(data.results);

      const topMovies = data.results.slice(0, 3);

      moviesList.innerHTML = "";

      for (const movie of topMovies) {
        const li = document.createElement("li");
        li.innerHTML = `
                    <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" />
                    <h2>${movie.title}</h2>
                    <p>IMDB Rating : ${movie.vote_average}</p>
                    <p> Year Release : ${movie.release_date}</p>
                `;

        moviesList.appendChild(li);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  submitButton.addEventListener("click", async (event) => {
    event.preventDefault();
    await getMovies();
  });

  // Initial call to getMovies
  getMovies();

  // // Function to shuffle an array randomly
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
});

// df746a13d4d785eb8692f7be0d6440a3
