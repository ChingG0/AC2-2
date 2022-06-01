const Symbols = [
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17989/__.png", // �®�
  "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png", // �R��
  "https://cdn-icons-png.flaticon.com/512/458/458518.png", // ���
  "https://assets-lighthouse.alphacamp.co/uploads/image/file/17988/__.png", // ����
];
const view = {
  //transform specialNumber
  transformNumber(number) {
    switch (number) {
      case 1:
        return "A";
      case 11:
        return "J";
      case 12:
        return "Q";
      case 13:
        return "K";
      default:
        return number;
    }
  },
  //
  getCardContent(index) {
    const number = this.transformNumber((index % 13) + 1);
    const symbol = Symbols[Math.floor(index / 13)];

    return `  <p>${number}</p>
      <img src="${symbol}">
      <p>${number}</p>
  </div>`;
  },
  //render view
  getCardElement(index) {
    return `<div data-index = '${index}' class="card back"></div>`;
  },

  displayCards() {
    const rootElement = document.querySelector("#cards");
    rootElement.innerHTML = utility
      .getRandomNumberArray(52)
      .map((index) => this.getCardElement(index))
      .join("");
  },

  flipCard(card) {
    if (card.classList.contains("back")) {
      card.classList.remove("back");
      card.innerHTML = this.getCardContent(Number(card.dataset.index));
      return;
    }
    card.classList.add("back");
    card.innerHTML = null;
  },
};

const utility = {
  getRandomNumberArray(count) {
    const number = Array.from(Array(count).keys());
    for (let index = number.length - 1; index > 0; index--) {
      let randomIndex = Math.floor(Math.random() * (index + 1));
      [number[index], number[randomIndex]] = [
        number[randomIndex],
        number[index],
      ];
    }
    return number;
  },
};

view.displayCards();

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (event) => {
    view.flipCard(card);
  });
});
