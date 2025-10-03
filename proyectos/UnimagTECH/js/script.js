document.addEventListener("DOMContentLoaded", () => {
  // --- Contenedores Principales de cada "Página" ---
  const loginPage = document.getElementById("login-page");
  const homePage = document.getElementById("home-page");
  const laptopsPage = document.getElementById("laptops-page");
  const computadoresPage = document.getElementById("computadores-page");
  const salasPage = document.getElementById("salas-page");
  const perfilPage = document.getElementById("perfil-page");
  const reservasPage = document.getElementById("reservas-page");
  const puzzlePage = document.getElementById("puzzle-page");

  // Array con todas las páginas
  const allPages = [
    loginPage,
    homePage,
    laptopsPage,
    computadoresPage,
    salasPage,
    perfilPage,
    reservasPage,
    puzzlePage,
  ].filter((page) => page !== null);

  // --- Elementos de la página de Login ---
  const initialView = document.getElementById("initial-view");
  const loginView = document.getElementById("login-view");
  const showLoginBtn = document.getElementById("show-login-btn");
  const backArrow = document.getElementById("back-arrow");
  const accederBtn = document.getElementById("acceder-btn");

  // --- Elementos de Navegación ---
  const navLinks = document.querySelectorAll(".nav-link");
  const hamburgerMenus = document.querySelectorAll(".hamburger-menu");

  // --- Elementos del Menú de Perfil ---
  const profileToggles = document.querySelectorAll(".user-profile");
  const logoutBtns = document.querySelectorAll(".logout-btn");

  // ---Función para ocultar todas las páginas principales---
  const hideAllPages = () => {
    allPages.forEach((page) => {
      page.classList.add("hidden");
    });
  };

  // --- Lógica de Navegación del Menú Principal ---
  navLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("data-target");
      const targetPage = document.getElementById(targetId);

      if (targetPage) {
        hideAllPages();
        targetPage.classList.remove("hidden");
        window.scrollTo(0, 0);
        // Ocultar menú hamburguesa después de la selección
        document.querySelectorAll('.main-nav').forEach(nav => nav.classList.remove('nav-open'));
      }
    });
  });

  // --- LÓGICA DEL MENÚ HAMBURGUESA ---
  hamburgerMenus.forEach(button => {
    button.addEventListener('click', () => {
        const nav = button.closest('.main-header').querySelector('.main-nav');
        nav.classList.toggle('nav-open');
    });
  });


  // --- Lógica específica de la Página de Login ---
  if (showLoginBtn) {
    showLoginBtn.addEventListener("click", () => {
      initialView.classList.add("hidden");
      loginView.classList.remove("hidden");
    });
  }

  if (backArrow) {
    backArrow.addEventListener("click", (event) => {
      event.preventDefault();
      initialView.classList.remove("hidden");
      loginView.classList.add("hidden");
    });
  }

  if (accederBtn) {
    accederBtn.addEventListener("click", () => {
      hideAllPages();
      if (homePage) homePage.classList.remove("hidden");
    });
  }

  // --- LÓGICA DEL MENÚ DE PERFIL ---
  const closeAllDropdowns = () => {
    document.querySelectorAll(".profile-dropdown").forEach((menu) => {
      menu.classList.add("hidden");
    });
  };
  profileToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.stopPropagation();
      const currentMenu = toggle.querySelector(".profile-dropdown");
      if (currentMenu.classList.contains("hidden")) {
        closeAllDropdowns();
        currentMenu.classList.remove("hidden");
      } else {
        closeAllDropdowns();
      }
    });
  });
  document.addEventListener("click", () => {
    closeAllDropdowns();
  });
  logoutBtns.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      hideAllPages();
      if (loginPage) {
        loginPage.classList.remove("hidden");
        if (initialView && loginView) {
          initialView.classList.remove("hidden");
          loginView.classList.add("hidden");
        }
      }
    });
  });

  // --- LÓGICA PARA EL BOTÓN DE RESERVAR ---
  const allReserveBtns = document.querySelectorAll(".reserve-btn");
  allReserveBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!btn.disabled) {
        alert("¡Reserva realizada con éxito!");
        hideAllPages();
        reservasPage.classList.remove("hidden");
      }
    });
  });

  // --- LÓGICA PARA EL HEADER INTELIGENTE (OCULTAR AL HACER SCROLL) ---
  let lastScrollY = window.scrollY;
  const allMainHeaders = document.querySelectorAll(".main-header");
  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY) {
      allMainHeaders.forEach((header) => header.classList.add("header-hidden"));
    } else {
      allMainHeaders.forEach((header) =>
        header.classList.remove("header-hidden")
      );
    }
    lastScrollY = currentScrollY;
  });

  // --- LÓGICA SECUENCIAL DEL PROCESO DE RESERVA ---
  document
    .querySelectorAll("#laptops-page, #computadores-page, #salas-page")
    .forEach((page) => {
      const steps = page.querySelectorAll(".process-step");
      const reserveBtn = page.querySelector(".reserve-btn");
      if (steps.length === 0 || !reserveBtn) return;
      const updateStepStatus = () => {
        let isNextStepEnabled = true;
        steps.forEach((step, index) => {
          if (isNextStepEnabled) {
            step.classList.remove("is-disabled");
            step.querySelectorAll("input").forEach((input) => (input.disabled = false));
          } else {
            step.classList.add("is-disabled");
            step.querySelectorAll("input").forEach((input) => (input.disabled = true));
          }
          let isCurrentStepCompleted = false;
          step.querySelectorAll("input").forEach((input) => {
            if (
              (input.type === "radio" && input.checked) ||
              (input.type === "text" && input.value !== "")
            ) {
              isCurrentStepCompleted = true;
            }
          });
          if (!isCurrentStepCompleted) {
            isNextStepEnabled = false;
          }
        });
        reserveBtn.disabled = !isNextStepEnabled;
      };
      page.querySelectorAll('input[type="radio"]').forEach((radio) => {
        radio.addEventListener("change", updateStepStatus);
      });
      const datePickerInput = page.querySelector(".date-picker");
      const timePickerInput = page.querySelector(".time-picker");
      if (datePickerInput && timePickerInput) {
        const timePicker = flatpickr(timePickerInput, {
          enableTime: true,
          noCalendar: true,
          dateFormat: "h:i K",
          minTime: "06:10",
          maxTime: "20:30",
          minuteIncrement: 10,
          onChange: updateStepStatus,
        });
        flatpickr(datePickerInput, {
          minDate: new Date().fp_incr(1),
          dateFormat: "d-m-Y",
          onChange: function () {
            updateStepStatus();
            timePicker.open();
          },
        });
      }
      updateStepStatus();
    });

  // ================================================================== //
  // =================== LÓGICA PARA EL PUZZLE ================== //
  // ================================================================== //
  
  if (puzzlePage) {
    // Elementos del DOM
    const container = document.getElementById("puzzle-container");
    const movesCounter = document.getElementById("moves-counter");
    const timerDisplay = document.getElementById("timer");
    const previewImage = document.getElementById("preview-image");
    
    // Botones
    const imageSelectorBtns = document.querySelectorAll(".select-image-btn");
    const difficultyBtns = document.querySelectorAll(".difficulty-btn");
    const restartBtn = document.getElementById("restart-btn");

    // Variables de estado del juego
    let gridSize = 4;
    let pieces = [];
    let emptyIndex;
    let moveCount = 0;
    let currentImageSrc = '';
    let timerInterval;
    let seconds = 0;
    let gameInProgress = false;

    // --- Funciones del Temporizador ---
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        seconds = 0;
        gameInProgress = true;
        timerInterval = setInterval(() => {
            seconds++;
            const min = Math.floor(seconds / 60).toString().padStart(2, '0');
            const sec = (seconds % 60).toString().padStart(2, '0');
            timerDisplay.textContent = `${min}:${sec}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        gameInProgress = false;
    }

    // --- Funciones Principales del Juego ---
    function startGame() {
        if (!currentImageSrc) return;
        
        stopTimer();
        moveCount = 0;
        movesCounter.textContent = moveCount;
        timerDisplay.textContent = "00:00";
        previewImage.src = currentImageSrc;
        
        // El tamaño del tablero ahora se basa en su ancho actual, que es responsive
        const boardSize = container.clientWidth;
        const pieceSize = boardSize / gridSize;
        container.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

        createPieces(pieceSize, boardSize);
        shufflePieces();
        render();
    }

    function createPieces(pieceSize, boardSize) {
        pieces = [];
        const totalPieces = gridSize * gridSize;
        for (let i = 0; i < totalPieces; i++) {
            const piece = document.createElement('div');
            piece.classList.add('puzzle-piece');
            // Ya no se necesita el style para width/height aquí porque el grid se encarga
            
            if (i === totalPieces - 1) {
                piece.classList.add('empty');
                emptyIndex = i;
            } else {
                const x = (i % gridSize) * (100 / (gridSize - 1));
                const y = Math.floor(i / gridSize) * (100 / (gridSize - 1));
                piece.style.backgroundImage = `url(${currentImageSrc})`;
                piece.style.backgroundSize = `${boardSize}px ${boardSize}px`;
                piece.style.backgroundPosition = `${x}% ${y}%`;
                piece.dataset.index = i;
            }
            piece.addEventListener('click', () => onPieceClick(piece));
            pieces.push(piece);
        }
    }

    function shufflePieces() {
        let shuffles = gridSize * gridSize * 10;
        for (let i = 0; i < shuffles; i++) {
            const neighbors = getNeighbors(emptyIndex);
            const randomNeighborIndex = neighbors[Math.floor(Math.random() * neighbors.length)];
            swapPieces(emptyIndex, randomNeighborIndex, false);
            emptyIndex = randomNeighborIndex;
        }
    }

    function render() {
        container.innerHTML = '';
        pieces.forEach(piece => container.appendChild(piece));
    }

    function onPieceClick(clickedPiece) {
        if (!gameInProgress && moveCount === 0) {
            startTimer(); // Iniciar el temporizador en el primer movimiento
        }
        
        const clickedIndex = pieces.indexOf(clickedPiece);
        if (isNeighbor(clickedIndex, emptyIndex)) {
            swapPieces(clickedIndex, emptyIndex, true);
            emptyIndex = clickedIndex;
            render();
            
            setTimeout(() => {
                if (isSolved()) {
                    stopTimer();
                    const finalTime = timerDisplay.textContent;
                    alert(`¡Felicidades! Resolviste el puzzle en ${moveCount} movimientos y un tiempo de ${finalTime}. 🥳`);
                }
            }, 100);
        }
    }
    
    function swapPieces(index1, index2, countMove) {
        [pieces[index1], pieces[index2]] = [pieces[index2], pieces[index1]];
        if (countMove) {
            moveCount++;
            movesCounter.textContent = moveCount;
        }
    }

    function isNeighbor(index1, index2) {
        const row1 = Math.floor(index1 / gridSize);
        const col1 = index1 % gridSize;
        const row2 = Math.floor(index2 / gridSize);
        const col2 = index2 % gridSize;
        return Math.abs(row1 - row2) + Math.abs(col1 - col2) === 1;
    }
    
    function getNeighbors(index) {
        const neighbors = [];
        const row = Math.floor(index / gridSize);
        const col = index % gridSize;
        if (row > 0) neighbors.push(index - gridSize);
        if (row < gridSize - 1) neighbors.push(index + gridSize);
        if (col > 0) neighbors.push(index - 1);
        if (col < gridSize - 1) neighbors.push(index + 1);
        return neighbors;
    }

    function isSolved() {
        for (let i = 0; i < pieces.length -1; i++) {
            if (pieces[i].classList.contains('empty') || parseInt(pieces[i].dataset.index) !== i) {
                return false;
            }
        }
        return true;
    }

    // --- EVENT LISTENERS PARA LOS BOTONES ---
    difficultyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        gridSize = parseInt(btn.dataset.size);
        difficultyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        startGame();
      });
    });

    imageSelectorBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        currentImageSrc = btn.dataset.src;
        startGame();
      });
    });

    restartBtn.addEventListener('click', startGame);

    // Iniciar el juego con valores por defecto
    function initializeDefaultGame() {
        if (imageSelectorBtns.length > 0) {
            currentImageSrc = imageSelectorBtns[0].dataset.src;
            // Forzar un reflow para asegurar que clientWidth esté disponible
            setTimeout(startGame, 0);
        }
    }
    
    initializeDefaultGame();
  }
});