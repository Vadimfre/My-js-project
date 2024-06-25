"use strict";

const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR = "https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_URL_SEARCH = "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

document.addEventListener("DOMContentLoaded", () => {
  getMovies(API_URL_POPULAR);

  const form = document.querySelector("form");
  const search = document.querySelector(".header__search");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (search.value) {
      getMovies(`${API_URL_SEARCH}${search.value}`);
      search.value = "";
    }
  });
});

async function fetchData(url) {
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  return response.json();
}

async function getMovies(url) {
  const data = await fetchData(url);
  showMovies(data.films);
}

function getClassByRate(vote) {
  return vote >= 7 ? "green" : vote > 5 ? "orange" : "red";
}

function showMovies(movies) {
  const moviesEl = document.querySelector(".movies");
  moviesEl.innerHTML = "";

  movies.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
      <div class="movie__cover-inner">
        <img src="${movie.posterUrlPreview}" class="movie__cover" alt="${movie.nameRu}" />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__category">${movie.genres.map((genre) => ` ${genre.genre}`).join(", ")}</div>
        ${movie.rating ? `<div class="movie__average movie__average--${getClassByRate(movie.rating)}">${movie.rating}</div>` : ""}
      </div>
    `;
    movieEl.addEventListener("click", () => openModal(movie.filmId));
    moviesEl.appendChild(movieEl);
  });
}

async function openModal(id) {
  const movie = await fetchData(`${API_URL_MOVIE_DETAILS}${id}`);
  const modalEl = document.querySelector(".modal");

  modalEl.classList.add("modal--show");
  document.body.classList.add("stop-scrolling");

  modalEl.innerHTML = generateMovieHTML(movie);

  const btnClose = modalEl.querySelector(".modal__button-close");
  btnClose.addEventListener("click", closeModal);
}

function generateMovieHTML(movie) {
  const genres = movie.genres.map((el) => `<span>${el.genre}</span>`).join(", ");
  const runtime = movie.filmLength ? `<li class="modal__movie-runtime">Время - ${movie.filmLength} минут</li>` : '';

  return `
    <div class="modal__card">
      <img class="modal__movie-backdrop" src="${movie.posterUrl}" alt="">
      <h2>
        <span class="modal__movie-title">${movie.nameRu}</span>
        <span class="modal__movie-release-year"> - ${movie.year}</span>
      </h2>
      <ul class="modal__movie-info">
        <li class="modal__movie-genre">Жанр - ${genres}</li>
        ${runtime}
        <li>Сайт: <a class="modal__movie-site" href="${movie.webUrl}">${movie.webUrl}</a></li>
        <li class="modal__movie-overview">Описание - ${movie.description}</li>
      </ul>
      <button type="button" class="modal__button-close">Закрыть</button>
    </div>
  `;
}

function closeModal() {
  const modalEl = document.querySelector(".modal");
  modalEl.classList.remove("modal--show");
  document.body.classList.remove("stop-scrolling");
}

window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal--show")) {
    closeModal();
  }
});
