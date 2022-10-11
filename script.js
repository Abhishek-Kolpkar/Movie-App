// TMBD API
const API_KEY = `api_key=43f93f93231d8eaf4fe802b225379abe`;

const Base_URL = `https://api.themoviedb.org/3`;

const API_URL = Base_URL + `/discover/movie?sort_by=popularity.desc&` + API_KEY;

const IMG_URL = `https://image.tmdb.org/t/p/w500`;

const searchURL = Base_URL + `/search/movie?` + API_KEY

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showMovies(data.results);
    });
}

getMovies(API_URL);

function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEle = document.createElement("div");
    movieEle.classList.add("movie");
    movieEle.innerHTML = `
    <img src="${IMG_URL + poster_path}" alt="${title}">

    <div class="movie-info">
      <h3>${title}</h3>
      <span class="${setColor(vote_average)}">${vote_average}</span>
    </div>

    <div class="overview">
      <h3>Overview</h3>
      ${overview}
    </div>
    `;

    main.appendChild(movieEle);
  });
}

// function for setColor of rating box according to vote
function setColor(vote) {
  if (vote >= 8) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else {
    return "red";
  }
}


form.addEventListener('submit', (e) => {
  e.preventDefault()

  const searchTerm = search.value

  if(searchTerm){
    getMovies(searchURL + `&query=` + searchTerm)
  }
  else{
    getMovies(API_URL)
  }
})