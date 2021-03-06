//api
const BASE_URL = "https://movie-list.alphacamp.io";
const INDEX_URL = BASE_URL + "/api/v1/movies/";
const POSTER_URL = BASE_URL + "/posters/";
const MOVIES_PER_PAGE = 12;
const movies = [];
let filteredMovies = [];
let cardMode = true

//監聽頁面
const dataPanel = document.querySelector("#data-panel");
const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const paginator = document.querySelector("#paginator");
const changeMode = document.querySelector('#change-mode')

//放入電影資料
function renderMovieList(data) {
  if(cardMode === true){
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
  }else if(cardMode === false){
    let rawHTML = `<ul class="list-group col-sm-12 mb-2">`
    data.forEach((item) => {
      // title, image, id
      rawHTML += `
      <li class="list-group-item d-flex justify-content-between">
        <h5 class="card-title">${item.title}</h5>
        <div>
          <button class="btn btn-primary btn-show-movie" data-toggle="modal" data-target="#movie-modal"
            data-id="${item.id}">More</button>
          <button class="btn btn-info btn-add-favorite" data-id="${item.id}">+</button>
        </div>
      </li>`
    })
    rawHTML += `</ul>`
    dataPanel.innerHTML = rawHTML
  }
}
//處理分頁數量
function renderPaginator(amount) {
  const numberOfPage = Math.ceil(amount / MOVIES_PER_PAGE);
  let rawHTML = "";

  for (let page = 1; page <= numberOfPage; page++) {
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`
  }
  paginator.innerHTML = rawHTML
}

//處理分頁
function getMoviesByPages(page) {
  const data = filteredMovies.length ? filteredMovies : movies

  const startIndex = (page - 1) * MOVIES_PER_PAGE;
  return data.slice(startIndex, startIndex + MOVIES_PER_PAGE);
}

//分頁按鈕function
function onPaginatorClicked(event){
  if(event.target.tagName !== 'A')return
  const page = Number(event.target.dataset.page)
  renderMovieList(getMoviesByPages(page))
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

//比對選取的ID,加到最愛
function addTofavorite(id) {
  const list = JSON.parse(localStorage.getItem("favoriteMovies")) || [];
  const movie = movies.find((movie) => movie.id === id);

  if (list.some((movie) => movie.id === id)) {
    return alert("已加入收藏清單");
  }
  alert("加入成功");

  list.push(movie);
  localStorage.setItem("favoriteMovies", JSON.stringify(list));
}

//More/加到最愛 按鈕
function onPanelClicked(event) {
  if (event.target.matches(".btn-show-movie")) {
    showMovieModal(Number(event.target.dataset.id));
  } else if (event.target.matches(".btn-add-favorite")) {
    addTofavorite(Number(event.target.dataset.id));
  }
}

//搜尋function
function onSearchFormSubmitted(event) {
  event.preventDefault(); //avoid website refresh
  const keyword = searchInput.value.trim().toLowerCase();


  filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(keyword)
  );

  if (filteredMovies.length === 0) {
    return alert(`Can't find ${keyword}, Please search again`);
  }
  /*
    for(const movie of movies){
        if(movie.title.toLowerCase.includes(keyword)){
            filteredMovies.push(movie)
        }
    }
    */
  renderPaginator(filteredMovies.length)
  renderMovieList(getMoviesByPages(1));
}

//cardMode跟listMode 按鈕
function onChangeModeClicked(event){
  if (event.target.matches("#card-mode-button")) {
    cardMode = true
    renderMovieList(getMoviesByPages(1))
  } else if (event.target.matches("#list-mode-button")) {
    cardMode = false
    renderMovieList(getMoviesByPages(1))
  }
}

//api資料,放到renderMovieList
axios.get(INDEX_URL).then((res) => {
  //for(const movie of res.data.results){
  //    movies.push(movie)
  //}
  movies.push(...res.data.results);
  renderPaginator(movies.length)
  renderMovieList(getMoviesByPages(1));
});


//監聽按鈕
dataPanel.addEventListener("click", onPanelClicked);
searchForm.addEventListener("submit", onSearchFormSubmitted);
paginator.addEventListener('click', onPaginatorClicked)
changeMode.addEventListener('click',onChangeModeClicked)

