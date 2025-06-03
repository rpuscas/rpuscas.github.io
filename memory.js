const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
const restartBtn = document.getElementById('restartBtn');
const nextPageBtn = document.getElementById('nextPageBtn');

// Pares de imágenes diferentes (16 imágenes, 8 pares)
const pairs = [
  ['images/farquad.jpg', 'images/farquad2.jpg'],
  ['images/beso1.jpg', 'images/beso2.jpg'],
  ['images/ble1.jpg', 'images/ble2.jpg'],
  ['images/sushi1.jpg', 'images/sushi2.jpg'],
  ['images/pizza1.jpg', 'images/pizza2.jpg'],
  ['images/ittakestwo1.jpg', 'images/ittakestwo2.png'],
  ['images/peque1.jpg', 'images/peque2.jpg'],
  ['images/mano1.jpg', 'images/mano2.jpg']
];

// Aplanamos y mezclamos las imágenes para crear el tablero
let cardsArray = shuffle(pairs.flat());

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matches = 0;

function shuffle(array) {
  for (let i = array.length -1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i +1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function createBoard() {
  gameBoard.innerHTML = '';
  matches = 0;
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  message.classList.add('hidden');

  cardsArray = shuffle(pairs.flat());

  cardsArray.forEach((imgSrc, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.image = imgSrc;

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">
          <img src="${imgSrc}" alt="Imagen de carta" />
        </div>
        <div class="card-back">?</div>
      </div>
    `;

    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  lockBoard = true;

  checkForMatch();
}

function checkForMatch() {
  let firstImg = firstCard.dataset.image;
  let secondImg = secondCard.dataset.image;

  // Verificamos si las dos imágenes pertenecen a la misma pareja
  let isMatch = pairs.some(pair => pair.includes(firstImg) && pair.includes(secondImg));

  if (isMatch) {
    matches++;
    resetTurn();
    if (matches === pairs.length) {
      setTimeout(() => {
        message.classList.remove('hidden');
      }, 500);
    }
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      resetTurn();
    }, 1000);
  }
}

function resetTurn() {
  [firstCard, secondCard] = [null, null];
  lockBoard = false;
}

restartBtn.addEventListener('click', () => {
                                       window.location.href = "prueba3.html"; // Cambia la URL a la deseada
                                     });

// Inicializar juego al cargar página
createBoard();
