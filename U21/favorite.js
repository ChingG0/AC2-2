//api
const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";

const movies = JSON.parse(localStorage.getItem("favoriteMovies"));

//監聽頁面
const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");

//放入電影資料
function renderMovieList(data) {
  let rawHTML = "";
  //processing
  data.forEach((item) => {
    //title, img
    rawHTML += `<div class="col-sm-3">
        <div class="mb-2">
          <div class="card">
            <img
              src="${POSTER_URL + item.image}"
              class="card-img-top"
              alt="Movie Poster"
            />
            <div class="card-body">
              <h6 class="card-title">${item.title}</h6>
            </div>
            <div class="card-footer">
              <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${
                item.id
              }">more
              </button>
              <button class="btn btn-info btn-add-favorite" data-id="${
                item.id
              }">+</button>
            </div>
          </div>
        </div>
      </div>`;
  });
  dataPanel.innerHTML = rawHTML;
}

//render modal的HTML
function showMovieModal(id) {
  const modalTitle = document.querySelector("#movie-modal-title");
  const modalImage = document.querySelector("#movie-modal-image");
  const modalDate = document.querySelector("#movie-modal-date");
  const modalDescription = document.querySelector("#movie-modal-description");

  axios.get(INDEX_URL + id).then((res) => {
    const data = res.data.results;
    modalTitle.innerText = data.title;
    modalDate.innerText = `Release Date: ` + data.release_date;
    modalDescription.innerText = data.description;
    modalImage.innerHTML = `<img src="${
      POSTER_URL + data.image
    }" alt="movie-poster" class="img-fluid">`;
  });
}

renderMovieList(movies);
