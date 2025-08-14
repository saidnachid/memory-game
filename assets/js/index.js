const gameBoard = document.querySelector(".game-board");
const statusText = document.getElementById("status");

let flippedCards = [];
let pairsLeft = 8;
let attempts = 0;
let isProcessing = false;

const emojis = ["😀", "🎨", "🚀", "🍕", "🌍", "🐱", "⚡", "🎉"];
const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);

cards.forEach((icon) => {
  const card = document.createElement("div");
  card.className = "card";
  card.innerHTML = `
    <div class="card-inner">
      <div class="card-face card-back">?</div>
      <div class="card-face card-front">${icon}</div>
    </div>
  `;
  card.addEventListener("click", flipCard);
  gameBoard.appendChild(card);
});

function flipCard() {
  if (isProcessing || this.classList.contains("flipped")) return;

  this.classList.add("flipped");
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    attempts++;
    updateStatus();
    isProcessing = true;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  const icon1 = card1.querySelector(".card-front").textContent;
  const icon2 = card2.querySelector(".card-front").textContent;

  if (icon1 === icon2) {
    pairsLeft--;
    flippedCards = [];
    isProcessing = false;
    if (pairsLeft === 0) {
      setTimeout(() => {
        alert(`🎉 You won in ${attempts} attempts!`);
        window.location.reload();
      }, 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      flippedCards = [];
      isProcessing = false;
    }, 800);
  }
}

function updateStatus() {
  statusText.textContent = `Attempts: ${attempts}`;
}
