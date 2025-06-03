const correctOrder = [
  'images/ordenar/bandahuevos.jpg',
  'images/ordenar/amante.jpg',
  'images/ordenar/disfraces.jpg',
  'images/ordenar/alcoy.jpg',
  'images/ordenar/camping.jpg',
  'images/ordenar/alcossebre.jpg',
  'images/ordenar/mudanza.jpg',
  'images/ordenar/escaperoom.jpg',
  'images/ordenar/herrang.jpg',
  'images/ordenar/zapiekanca.jpg'
];

let currentOrder = [...correctOrder];
shuffleArray(currentOrder);

const container = document.getElementById('image-container');
const successMessage = document.getElementById('success-message');

function renderImages() {
  container.innerHTML = '';
  currentOrder.forEach((src, index) => {
    const div = document.createElement('div');
    div.classList.add('image-slot');
    div.setAttribute('draggable', true);
    div.setAttribute('data-index', index);

    const img = document.createElement('img');
    img.src = src;

    div.appendChild(img);
    container.appendChild(div);
  });

  addDragAndDropListeners();
}

function addDragAndDropListeners() {
  const slots = document.querySelectorAll('.image-slot');

  let draggedIndex = null;

  slots.forEach(slot => {
    slot.addEventListener('dragstart', e => {
      draggedIndex = +slot.getAttribute('data-index');
      slot.classList.add('dragging');
    });

    slot.addEventListener('dragend', () => {
      slot.classList.remove('dragging');
    });

    slot.addEventListener('dragover', e => {
      e.preventDefault();
      slot.style.transform = 'scale(1.05)';
    });

    slot.addEventListener('dragleave', () => {
      slot.style.transform = 'scale(1)';
    });

    slot.addEventListener('drop', () => {
      const droppedIndex = +slot.getAttribute('data-index');
      [currentOrder[draggedIndex], currentOrder[droppedIndex]] =
        [currentOrder[droppedIndex], currentOrder[draggedIndex]];
      renderImages();
      checkOrder();
    });
  });
}

function checkOrder() {
  const isCorrect = currentOrder.every((src, i) => src === correctOrder[i]);
  if (isCorrect) {
    successMessage.classList.remove('hidden');
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

renderImages();
