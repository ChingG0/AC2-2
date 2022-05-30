const Symbols = [
    'https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png', // 黑桃
    'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png', // 愛心
    'https://cdn-icons-png.flaticon.com/512/458/458518.png', // 方塊
    'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png' // 梅花
  ]
const view = {
   
    //transform 特殊牌
    transformNumber(number){
        switch (number) {
          case 1:
            return 'A'
          case 11:
            return 'J'
          case 12:
            return 'Q'
          case 13:
            return 'K'
          default:
            return number
        }
    },
    //render 畫面
    getCardElement(index){
        const number = this.transformNumber((index % 13) + 1)
        const symbol = Symbols[Math.floor(index / 13)]
        return `<div class="card back">
        <p>${number}</p>
        <img src="${symbol}">
        <p>${number}</p>
    </div>`
    },
    //導入52張
    displayCards(){
        const rootElement = document.querySelector('#cards')
        rootElement.innerHTML = Array.from(Array(52).keys()).map(index => this.getCardElement(index)).join('')
    }
}

view.displayCards()