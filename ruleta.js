const values = ["1 millon de euros💸", "Un avion privado✈️", "La Luna🌚", "Un Masaje todos los días🧘‍♀️", "Un bolso Birkin👜", "Viaje a Italia🇮🇹", "Un descapotable rojo🚗", "Diamantes, muchos diamantes💎"]; // ejemplos
const winningValue = "Viaje a Italia🇮🇹"; // valor que siempre queremos que salga

const display = document.getElementById("rouletteDisplay");
const spinBtn = document.getElementById("spinBtn");

spinBtn.addEventListener("click", () => {
  spinBtn.disabled = true;

  let index = 0;
  let totalCycles = 30; // número de cambios totales
  let delay = 120;

  function spin() {
    display.textContent = values[index % values.length];
    index++;
    totalCycles--;

    if (totalCycles > 0) {
      setTimeout(spin, delay);
      delay += 5; // más lento hacia el final
    } else {
      display.textContent = winningValue;
      spinBtn.disabled = false;
    }
  }

  spin();
});
