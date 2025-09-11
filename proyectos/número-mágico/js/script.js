// --- 1. Selección de Elementos del DOM ---
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const restartButton = document.getElementById('restartButton');
const message = document.getElementById('message');
const attemptsSpan = document.getElementById('attempts');
const previousGuessesSpan = document.getElementById('previousGuesses');

// --- 2. Variables del Juego ---
let magicNumber;
let attempts;
const MAX_ATTEMPTS = 10;
let previousGuesses = [];

// --- 3. Funciones del Juego ---

/**
 * Inicia o reinicia el juego a su estado original.
 */
function resetGame() {
    // Genera un nuevo número aleatorio entre 1 y 100
    magicNumber = Math.floor(Math.random() * 100) + 1;
    
    // Reinicia el contador de intentos
    attempts = MAX_ATTEMPTS;
    
    // Limpia el historial de intentos
    previousGuesses = [];

    // Actualiza la interfaz de usuario (UI)
    attemptsSpan.textContent = attempts;
    message.textContent = '¡Buena suerte!';
    message.className = ''; // Limpia las clases de color
    previousGuessesSpan.textContent = '-';
    guessInput.value = '';
    
    // Habilita los controles del juego
    guessInput.disabled = false;
    guessButton.disabled = false;
    
    // Oculta el botón de reinicio
    restartButton.classList.add('hidden');

    // Pone el foco en el campo de entrada
    guessInput.focus();

    console.log(`Número mágico para depuración: ${magicNumber}`);
}

/**
 * Gestiona la lógica de un intento del jugador.
 */
function handleGuess() {
    const userGuessText = guessInput.value;
    
    // Valida que la entrada no esté vacía
    if (userGuessText === '') {
        updateMessage('Debes ingresar un número.', 'feedback-wrong');
        return;
    }
    
    const userGuess = parseInt(userGuessText, 10);
    
    // Valida que sea un número válido entre 1 y 100
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        updateMessage('Por favor, ingresa un número válido entre 1 y 100.', 'feedback-wrong');
        guessInput.value = '';
        return;
    }

    // Procesa el intento
    attempts--;
    previousGuesses.push(userGuess);

    // Actualiza la UI con el nuevo estado
    attemptsSpan.textContent = attempts;
    previousGuessesSpan.textContent = previousGuesses.join(', ');
    
    // Compara la conjetura con el número mágico
    if (userGuess === magicNumber) {
        updateMessage(`🎉 ¡Felicidades! ¡Adivinaste el número ${magicNumber}! 🎉`, 'feedback-correct');
        endGame();
    } else if (attempts === 0) {
        updateMessage(`😭 ¡Fin del juego! El número era ${magicNumber}.`, 'feedback-wrong');
        endGame();
    } else {
        const hint = userGuess < magicNumber ? 'más alto' : 'más bajo';
        updateMessage(`Incorrecto. El número mágico es ${hint}.`, 'feedback-hint');
    }

    // Limpia el campo de entrada para el siguiente intento
    guessInput.value = '';
    guessInput.focus();
}

/**
 * Finaliza el juego, deshabilitando los controles.
 */
function endGame() {
    guessInput.disabled = true;
    guessButton.disabled = true;
    restartButton.classList.remove('hidden');
}

/**
 * Actualiza el mensaje de feedback para el usuario.
 * @param {string} text - El texto a mostrar.
 * @param {string} className - La clase CSS para el color del mensaje.
 */
function updateMessage(text, className) {
    message.textContent = text;
    message.className = className;
}

// --- 4. Event Listeners ---

// Iniciar el juego cuando la página se cargue
document.addEventListener('DOMContentLoaded', resetGame);

// Manejar el clic en el botón "Adivinar"
guessButton.addEventListener('click', handleGuess);

// Permitir enviar con la tecla "Enter"
guessInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        handleGuess();
    }
});

// Manejar el clic en el botón "Jugar de Nuevo"
restartButton.addEventListener('click', resetGame);