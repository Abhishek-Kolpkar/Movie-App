// TMBD API
const API_KEY = `api_key=43f93f93231d8eaf4fe802b225379abe`;

const Base_URL = `https://api.themoviedb.org/3`;

const API_URL = Base_URL + `/discover/movie?sort_by=popularity.desc&` + API_KEY;

const IMG_URL = `https://image.tmdb.org/t/p/w500`;

const searchURL = Base_URL + `/search/movie?` + API_KEY

const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const tags = document.getElementById('tags')

let selectedGenre = []

// immediately load when page load
setGenere()
function setGenere(){
  tags.innerHTML = ''

  genres.forEach(genre => {
    const t = document.createElement('div')
    t.classList.add('tag')
    t.id = genre.id
    t.innerText = genre.name

    t.addEventListener('click', () => {
      if(selectedGenre.length == 0){
        selectedGenre.push(genre.id)
      }
      else{
        if(selectedGenre.includes(genre.id)){
          selectedGenre.forEach((id, idx) => {
            if(id = genre.id){
              selectedGenre.splice(idx, 1)
            }
          })
        }
        else{
          selectedGenre.push(genre.id)
        }
      }

      getMovies(API_URL + `&with_genres=` + encodeURI(selectedGenre.join(',')))
      highLightSelection()
    })
    tags.append(t)
  })
}


function highLightSelection() {
  const allTags = document.querySelectorAll('.tag')
  allTags.forEach(tag => {
    tag.classList.remove('highlight')
  })
  clearBtn()
  if(selectedGenre.length != 0){
    selectedGenre.forEach(id => {
      const highLightedTag = document.getElementById(id)
      highLightedTag.classList.add('highlight')
    })
  }
}

function clearBtn() {
  let clearBtn = document.getElementById('clear')
  if(clearBtn) {
    clearBtn.classList.add('highlight')
  }
  else{
    const clear = document.createElement('div')
    clear.classList.add('tag', 'highlight')
    clear.id = 'clear'
    clear.innerText = 'Clear x'

    clear.addEventListener('click', () => {
      selectedGenre = []
      setGenere()
      getMovies(API_URL);
    })
    tags.append(clear)
  }

}


getMovies(API_URL);

function getMovies(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if(data.results.length != 0){
        showMovies(data.results);
      }
      else{
        main.innerHTML = `<h1 class='error'>No Results Found...</h1>`
      }
    });
}



function showMovies(data) {
  main.innerHTML = "";

  data.forEach((movie) => {
    const { title, poster_path, vote_average, overview } = movie;

    const movieEle = document.createElement("div");
    movieEle.classList.add("movie");
    movieEle.innerHTML = `
    <img src="${poster_path ? IMG_URL + poster_path : 'https://via.placeholder.com/1080x1580'}" alt="${title}">

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
  selectedGenre = []
  setGenere()

  if(searchTerm){
    getMovies(searchURL + `&query=` + searchTerm)
  }
  else{
    getMovies(API_URL)
  }
})