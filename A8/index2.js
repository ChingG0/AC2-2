const BASE_URL = 'https://lighthouse-user-api.herokuapp.com'
const INDEX_URL = BASE_URL + '/api/v1/users'

const dataPanel = document.querySelector('#data-panel')

Avatars = []

function renderAvatarList(data){
    let rawHTML = ''
    data.forEach((item)=>{
    rawHTML += `<div class="col-sm-2 mt-3">
                    <div class="card">
                        <img src="${item.avatar}"    class="card-img-top"  alt="avatar">
                        <div class="card-body">
                            <h6 class="card-title" dir="ltr">${item.name}${item.id}</h6>
                        </div>
                    </div>
                </div>`
    })
    dataPanel.innerHTML = rawHTML
}

axios.get(INDEX_URL).then((res)=>{
    Avatars.push(...res.data.results)
    renderAvatarList(Avatars)
})