let scores = [0, 0];
let currentPlayer = 0;
let round = 1;
let rolls = [0, 0];

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