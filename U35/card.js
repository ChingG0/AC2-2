const Symbols = [
    'https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png', // �®�
    'https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png', // �R��
    'https://cdn-icons-png.flaticon.com/512/458/458518.png', // ���
    'https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png' // ����
  ]
const view = {
   
    //transform �S��P
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
    //render �e��
    getCardElement(index){
        const number = this.transformNumber((index % 13) + 1)
        const symbol = Symbols[Math.floor(index / 13)]
        return `<div class="card back">
        <p>${number}</p>
        <img src="${symbol}">
        <p>${number}</p>
    </div>`
    },
    //�ɤJ52�i
    displayCards(){
        const rootElement = document.querySelector('#cards')
        rootElement.innerHTML = Array.from(Array(52).keys()).map(index => this.getCardElement(index)).join('')
    }
}

view.displayCards()