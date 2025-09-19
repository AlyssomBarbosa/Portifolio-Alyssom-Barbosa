document.addEventListener("DOMContentLoaded", () => {
  // elementos de áudio
  const hoverSound = document.getElementById("hover-sound");
  const clickSound = document.getElementById("click-sound");

  // botão toggle
  const soundToggle = document.getElementById("sound-toggle");

  // pega o estado salvo (se existir)
  let soundEnabled = localStorage.getItem("soundEnabled") === "true";

  // aplica o estado inicial no botão
  if (soundToggle) {
    if (soundEnabled) {
      soundToggle.textContent = "🔊 Sons";
      soundToggle.setAttribute("aria-pressed", "true");
    } else {
      soundToggle.textContent = "🔇 Sons";
      soundToggle.setAttribute("aria-pressed", "false");
    }
  }

  // alternar o som ao clicar no botão
  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      localStorage.setItem("soundEnabled", soundEnabled); // salva no navegador
      if (soundEnabled) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
        soundToggle.textContent = "🔊 Sons";
        soundToggle.setAttribute("aria-pressed", "true");
      } else {
        soundToggle.textContent = "🔇 Sons";
        soundToggle.setAttribute("aria-pressed", "false");
      }
    });
  }

  // elementos interativos
  const interactiveElements = document.querySelectorAll("a, button, .card a, .form-contato button");

  interactiveElements.forEach(el => {
    el.addEventListener("mouseover", () => {
      if (!soundEnabled) return;
      if (hoverSound) {
        hoverSound.currentTime = 0;
        hoverSound.play().catch(() => {});
      }
    });

    el.addEventListener("click", () => {
      if (!soundEnabled) return;
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
      }
    });
  });

  // formulário de contato (fake)
  const form = document.querySelector(".form-contato");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Mensagem enviada! 🚀 (em breve com back-end real)");
    });
  }
});
