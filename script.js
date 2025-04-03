let scores = [0, 0];
let currentPlayer = 0;
let round = 1;
let rolls = [0, 0];
let cont = 0;

const diceRotations = {
    1: "rotateY(0deg)",        // ⚀ (Frontal)
    2: "rotateY(90deg)",       // ⚁ (Derecha)
    3: "rotateX(90deg)",       // ⚂ (Arriba)
    4: "rotateX(-90deg)",      // ⚃ (Abajo)
    5: "rotateY(-90deg)",      // ⚄ (Izquierda)
    6: "rotateY(180deg)"       // ⚅ (Trasera)
};




document.getElementById("rollDice").addEventListener("click", function() {
    let dice = document.getElementById(`dice${currentPlayer + 1}`);

    // Generar número aleatorio entre 1 y 6
    let roll = Math.floor(Math.random() * 6) + 1;

    // Animación de giro aleatorio antes de mostrar el número correcto
    let randomX = Math.floor(Math.random() * 720) + 360;
    let randomY = Math.floor(Math.random() * 720) + 360;
    dice.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;

    setTimeout(() => {
        dice.style.transform = diceRotations[roll];

        // Actualizar puntaje
        scores[currentPlayer] += roll;
        document.getElementById(`score${currentPlayer + 1}`).textContent = scores[currentPlayer];

        rolls[currentPlayer]++;

        // Cambiar de jugador después de cada lanzamiento
        
        if (rolls[currentPlayer] === 1) {
            currentPlayer = (currentPlayer + 1) % 2;
            rolls[currentPlayer] = 0;
            cont++;

            if (cont === 2) {
                round++;
                document.getElementById("round").textContent = round;
                cont = 0;
            }
            document.getElementById("currentPlayer").textContent = `Jugador ${currentPlayer + 1}`;

            if (round > 3) {
                determinarGanador();
                return;
            }
        }
    }, 1000);
});

document.getElementById("resetGame").addEventListener("click", function() {
    scores = [0, 0];
    currentPlayer = 0;
    round = 1;
    rolls = [0, 0];

    document.getElementById("score1").textContent = "0";
    document.getElementById("score2").textContent = "0";
    document.getElementById("round").textContent = "1";
    document.getElementById("currentPlayer").textContent = "Jugador 1";
    document.getElementById("message").textContent = "";

    document.getElementById("dice1").style.transform = "rotateX(0deg) rotateY(0deg)";
    document.getElementById("dice2").style.transform = "rotateX(0deg) rotateY(0deg)";

    document.getElementById("rollDice").disabled = false;
});

function determinarGanador() {
    let message = scores[0] > scores[1] ? "🎉 ¡Jugador 1 gana!" :
                  scores[0] < scores[1] ? "🎉 ¡Jugador 2 gana!" :
                  "🤝 ¡Empate!";
    document.getElementById("message").textContent = message;
    document.getElementById("rollDice").disabled = true;
}
