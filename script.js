document.addEventListener("DOMContentLoaded", () => {
  // elementos de áudio
  const hoverSound = document.getElementById("hover-sound");
  const clickSound = document.getElementById("click-sound");

  // botão toggle que o usuário usa para ativar/desativar sons
  const soundToggle = document.getElementById("sound-toggle");
  let soundEnabled = false;

  // Função para tentar "destravar" o áudio (executada num clique do usuário)
  function unlockAudio() {
    if (!soundEnabled) {
      // tocar um som de click para "destravar" o autoplay (é um gesto do usuário)
      if (clickSound) {
        clickSound.currentTime = 0;
        clickSound.play().catch(() => {});
      }
      soundEnabled = true;
      if (soundToggle) {
        soundToggle.textContent = "🔊 Sons";
        soundToggle.setAttribute("aria-pressed", "true");
      }
    }
  }

  // se o botão existe, usa ele como forma de habilitar/desabilitar sons
  if (soundToggle) {
    soundToggle.addEventListener("click", () => {
      if (!soundEnabled) {
        unlockAudio();
      } else {
        soundEnabled = false;
        soundToggle.textContent = "🔇 Sons";
        soundToggle.setAttribute("aria-pressed", "false");
      }
    });
  }

  // também, se o usuário clicar em qualquer lugar da página a primeira vez, destravamos áudio
  document.addEventListener("click", function firstClick() {
    unlockAudio();
    // só executar na primeira vez
    document.removeEventListener("click", firstClick);
  });

  // seleciona elementos interativos
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

  // prevenção do submit real do formulário (se existir)
  const form = document.querySelector(".form-contato");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Mensagem enviada! 🚀 (em breve com back-end real)");
    });
  }
});
