const GAME_STATE = {
  FirstCardAwaits: "FirstCardAwaits",
  SecondCardAwaits: "SecondCardAwaits",
  CardMatchFailed: "CardMatchFailed",
  CardMatched: "CardMatched",
  GameFinished: "GameFinished",
};

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

  displayCards(indexes) {
    const rootElement = document.querySelector("#cards");
    rootElement.innerHTML = indexes
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

  pairCard(card) {
    card.classList.add("paired");
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

const model = {
  revealedCards: [],

  isRevealCardsMatched() {
    return (
      this.revealedCards[0].dataset.index % 13 ===
      this.revealedCards[1].dataset.index % 13
    );
  },
};

const controller = {
  currentState: GAME_STATE.FirstCardAwaits,

  generateCards() {
    view.displayCards(utility.getRandomNumberArray(52));
  },

  dispatchCardAction(card) {
    if (!card.classList.contains("back")) {
      return;
    }
    switch (this.currentState) {
      case GAME_STATE.FirstCardAwaits:
        view.flipCard(card);
        model.revealedCards.push(card);
        this.currentState = GAME_STATE.SecondCardAwaits;
        break;

      case GAME_STATE.SecondCardAwaits:
        view.flipCard(card);
        model.revealedCards.push(card);
        if (model.isRevealCardsMatched()) {
          //Matched
          this.currentState = GAME_STATE.CardMatched;
          view.pairCard(model.revealedCards[0]);
          view.pairCard(model.revealedCards[1]);
          model.revealedCards = []
          this.currentState = GAME_STATE.FirstCardAwaits;
        } else {
          //Failed
          this.currentState = GAME_STATE.CardMatchFailed;
          setTimeout(() => {
            view.flipCard(model.revealedCards[0])
            view.flipCard(model.revealedCards[1])
            model.revealedCards = []
            this.currentState = GAME_STATE.FirstCardAwaits
          }, 500);
        }
    }
    console.log(this.currentState);
  },
};

controller.generateCards();

document.querySelectorAll(".card").forEach((card) => {
  card.addEventListener("click", (event) => {
    controller.dispatchCardAction(card);
  });
});
