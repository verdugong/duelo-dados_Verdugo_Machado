let scores = [0, 0];
let currentPlayer = 0;
let round = 1;
let rolls = [0, 0];

// Elementos del historial de lanzamientos
let history1 = document.getElementById("history1");
let history2 = document.getElementById("history2");

// Elementos de las celdas de puntuación acumulada por ronda
let score1Round1 = document.getElementById("score1-round1");
let score1Round2 = document.getElementById("score1-round2");
let score1Round3 = document.getElementById("score1-round3");
let score1Total = document.getElementById("score1-total");

let score2Round1 = document.getElementById("score2-round1");
let score2Round2 = document.getElementById("score2-round2");
let score2Round3 = document.getElementById("score2-round3");
let score2Total = document.getElementById("score2-total");

document.getElementById("rollDice").addEventListener("click", function() {
    let dice = document.getElementById(`dice${currentPlayer + 1}`);

    // Generar un número aleatorio del 1 al 6
    let roll = Math.floor(Math.random() * 6) + 1;

    // Definir ángulos de rotación para cada número
    let rotations = {
        1: "rotateX(0deg) rotateY(0deg)",
        2: "rotateX(-90deg) rotateY(0deg)",
        3: "rotateX(0deg) rotateY(-90deg)",
        4: "rotateX(0deg) rotateY(90deg)",
        5: "rotateX(90deg) rotateY(0deg)",
        6: "rotateX(180deg) rotateY(0deg)"
    };

    // Aplicar animación de giro antes de la caída
    let randomX = Math.floor(Math.random() * 360) + 720;
    let randomY = Math.floor(Math.random() * 360) + 720;
    dice.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;

    setTimeout(() => {
        dice.style.transform = rotations[roll];

        // Actualizar puntaje
        scores[currentPlayer] += roll;
        document.getElementById(`score${currentPlayer + 1}`).textContent = scores[currentPlayer];

        // Agregar al historial de lanzamientos
        let newHistoryRow = document.createElement("tr");
        newHistoryRow.innerHTML = `<td>Lanzamiento ${rolls[currentPlayer] + 1}</td><td>${roll}</td>`;
        if (currentPlayer === 0) {
            history1.appendChild(newHistoryRow); // Jugador 1
        } else {
            history2.appendChild(newHistoryRow); // Jugador 2
        }

        // Actualizar puntuación acumulada por ronda
        if (rolls[currentPlayer] === 0) {
            if (currentPlayer === 0) {
                score1Round1.textContent = roll;
            } else {
                score2Round1.textContent = roll;
            }
        } else if (rolls[currentPlayer] === 1) {
            if (currentPlayer === 0) {
                score1Round2.textContent = roll;
            } else {
                score2Round2.textContent = roll;
            }
        } else if (rolls[currentPlayer] === 2) {
            if (currentPlayer === 0) {
                score1Round3.textContent = roll;
                score1Total.textContent = scores[0]; // Total después de 3 rondas
            } else {
                score2Round3.textContent = roll;
                score2Total.textContent = scores[1]; // Total después de 3 rondas
            }
        }

        rolls[currentPlayer]++;
        if (rolls[currentPlayer] === 3) {
            currentPlayer = (currentPlayer + 1) % 2;
            rolls[currentPlayer] = 0;
            round++;
            document.getElementById("round").textContent = round;
            document.getElementById("currentPlayer").textContent = `Jugador ${currentPlayer + 1}`;

            if (round > 3) {
                determineWinner();
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

    // Limpiar el historial de lanzamientos
    history1.innerHTML = "";
    history2.innerHTML = "";

    // Limpiar las tablas de puntuación
    score1Round1.textContent = "0";
    score1Round2.textContent = "0";
    score1Round3.textContent = "0";
    score1Total.textContent = "0";

    score2Round1.textContent = "0";
    score2Round2.textContent = "0";
    score2Round3.textContent = "0";
    score2Total.textContent = "0";
});

function determineWinner() {
    let message = "";
    if (scores[0] > scores[1]) {
        message = "🎉 ¡Jugador 1 gana!";
    } else if (scores[0] < scores[1]) {
        message = "🎉 ¡Jugador 2 gana!";
    } else {
        message = "🤝 ¡Empate!";
    }
    document.getElementById("message").textContent = message;
}