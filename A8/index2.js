const BASE_URL = "https://lighthouse-user-api.herokuapp.com";
const INDEX_URL = BASE_URL + "/api/v1/users";
const AVATARS_PER_PAGE = 18;

const dataPanel = document.querySelector("#data-panel");
const paginator = document.querySelector("#paginator");

Avatars = [];

//render畫面
function renderAvatarList(data) {
  let rawHTML = "";
  data.forEach((item) => {
    rawHTML += `<div class="col-sm-2 mt-3">
                    <div class="card">
                        <img src="${item.avatar}"    class="card-img-top"  alt="avatar">
                        <div class="card-body">
                            <h6 class="card-title" dir="ltr">${item.name}${item.id}</h6>
                        </div>
                    </div>
                </div>`;
  });
  dataPanel.innerHTML = rawHTML;
}

function getAvatarsByPages(page) {
  const startIndex = (page - 1) * AVATARS_PER_PAGE
  return Avatars.slice(startIndex, startIndex + AVATARS_PER_PAGE)
}

//將資料分頁
function renderPaginator(amount) {
  const numberOfPage = Math.ceil(amount / AVATARS_PER_PAGE);
  let rawHTML = "";
  for(let page = 1; page <= AVATARS_PER_PAGE; page++){
    rawHTML += `<li class="page-item"><a class="page-link" href="#" data-page="${page}">${page}</a></li>`;  
  }
  paginator.innerHTML = rawHTML
}

function onPaginatorClicked(event) {
  if (event.target.tagName !== "A") return;
  const page = Number(event.target.dataset.page);
  renderAvatarList(getAvatarsByPages(page));
}

axios.get(INDEX_URL).then((res) => {
  Avatars.push(...res.data.results);
  renderPaginator(Avatars.length)
  renderAvatarList(getAvatarsByPages(1));
});

paginator.addEventListener("click", onPaginatorClicked);
