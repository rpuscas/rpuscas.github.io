// Respuestas correctas hardcodeadas
const correctAnswers = {
  1: 'doorstep',
  2: 'color',
  3: 'aspirina'
};

const state = {
  1: false,
  2: false,
  3: false
};

function checkAnswer(num) {
  const input = document.getElementById(`input${num}`);
  const check = document.getElementById(`check${num}`);
  const wrong = document.getElementById(`wrong${num}`);

  if (input.value.trim().toLowerCase() === correctAnswers[num]) {
    check.classList.remove('hidden');
    wrong.classList.add('hidden');
    state[num] = true;
  } else {
    check.classList.add('hidden');
    wrong.classList.remove('hidden');
    state[num] = false;
  }

  checkCompletion();
}

function checkCompletion() {
  if (state[1] && state[2] && state[3]) {
    document.getElementById('success-message').classList.remove('hidden');
  }
}
