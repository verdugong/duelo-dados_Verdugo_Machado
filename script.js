let puntajes = [0, 0];
let jugadorActual = 0;
let ronda = 1;
let lanzamientos = [0, 0];
let cont = 0;

// Rotaciones para cada cara del dado
const rotacionesDado = {
    1: "rotateY(0deg)",    // ⚀ (Frente)
    2: "rotateY(90deg)",   // ⚁ (Derecha)
    3: "rotateX(90deg)",   // ⚂ (Arriba)
    4: "rotateX(-90deg)",  // ⚃ (Abajo)
    5: "rotateY(-90deg)",  // ⚄ (Izquierda)
    6: "rotateY(180deg)"   // ⚅ (Atrás)
};

// Referencias a celdas del HTML
let puntaje1Ronda1 = document.getElementById("puntaje1-ronda1");
let puntaje1Ronda2 = document.getElementById("puntaje1-ronda2");
let puntaje1Ronda3 = document.getElementById("puntaje1-ronda3");
let puntaje1Total  = document.getElementById("puntaje1-total");

let puntaje2Ronda1 = document.getElementById("puntaje2-ronda1");
let puntaje2Ronda2 = document.getElementById("puntaje2-ronda2");
let puntaje2Ronda3 = document.getElementById("puntaje2-ronda3");
let puntaje2Total  = document.getElementById("puntaje2-total");

document.getElementById("lanzarDado").addEventListener("click", function() {
    // Seleccionar el dado según el jugador actual
    let dado = document.getElementById(`dado${jugadorActual + 1}`);

    // Generar un número aleatorio entre 1 y 6
    let tirada = Math.floor(Math.random() * 6) + 1;

    // Rotación aleatoria inicial
    let randomX = Math.floor(Math.random() * 720) + 360;
    let randomY = Math.floor(Math.random() * 720) + 360;
    dado.style.transform = `rotateX(${randomX}deg) rotateY(${randomY}deg)`;

    // Aplicar la rotación final (cara correspondiente)
    setTimeout(() => {
        dado.style.transform = rotacionesDado[tirada];

        // Sumar la tirada al puntaje del jugador
        puntajes[jugadorActual] += tirada;
        document.getElementById(`puntaje${jugadorActual + 1}`).textContent = puntajes[jugadorActual];

        // Guardar la tirada en la tabla de resultados
        if (ronda === 1) {
            if (jugadorActual === 0) {
                puntaje1Ronda1.textContent = tirada;
            } else {
                puntaje2Ronda1.textContent = tirada;
            }
        } else if (ronda === 2) {
            if (jugadorActual === 0) {
                puntaje1Ronda2.textContent = tirada;
            } else {
                puntaje2Ronda2.textContent = tirada;
            }
        } else if (ronda === 3) {
            if (jugadorActual === 0) {
                puntaje1Ronda3.textContent = tirada;
                puntaje1Total.textContent  = puntajes[0];
            } else {
                puntaje2Ronda3.textContent = tirada;
                puntaje2Total.textContent  = puntajes[1];
            }
        }

        // Control de turnos
        lanzamientos[jugadorActual]++;
        if (lanzamientos[jugadorActual] === 1) {
            // Cambiar de jugador
            jugadorActual = (jugadorActual + 1) % 2;
            lanzamientos[jugadorActual] = 0;
            cont++;

            // Si ambos jugadores han lanzado, avanza la ronda
            if (cont === 2) {
                ronda++;
                document.getElementById("ronda").textContent = ronda;
                cont = 0;
            }

            // Mostrar en pantalla qué jugador va
            document.getElementById("jugadorActual").textContent = `Jugador ${jugadorActual + 1}`;

            // Si ya pasamos la ronda 3, se determina un ganador
            if (ronda > 3) {
                determinarGanador();
                return;
            }
        }
    }, 1000);
});

document.getElementById("reiniciarJuego").addEventListener("click", function() {
    // Volver todo a cero
    puntajes = [0, 0];
    jugadorActual = 0;
    ronda = 1;
    lanzamientos = [0, 0];
    cont = 0;

    // Resetear texto en pantalla
    document.getElementById("puntaje1").textContent = "0";
    document.getElementById("puntaje2").textContent = "0";
    document.getElementById("ronda").textContent = "1";
    document.getElementById("jugadorActual").textContent = "Jugador 1";

    puntaje1Ronda1.textContent = "0";
    puntaje1Ronda2.textContent = "0";
    puntaje1Ronda3.textContent = "0";
    puntaje1Total.textContent  = "0";

    puntaje2Ronda1.textContent = "0";
    puntaje2Ronda2.textContent = "0";
    puntaje2Ronda3.textContent = "0";
    puntaje2Total.textContent  = "0";

    document.getElementById("dado1").style.transform = "rotateX(0deg) rotateY(0deg)";
    document.getElementById("dado2").style.transform = "rotateX(0deg) rotateY(0deg)";

    document.getElementById("lanzarDado").disabled = false;

    let mensajeElemento = document.getElementById("message");
    if(mensajeElemento) {
        mensajeElemento.textContent = "";
    }
});

// Determinar el ganador
function determinarGanador() {
    let mensaje = 
        puntajes[0] > puntajes[1] ? "🎉 ¡Jugador 1 gana!" :
        puntajes[0] < puntajes[1] ? "🎉 ¡Jugador 2 gana!" :
                                    "🤝 ¡Empate!";

    document.getElementById("mensajeGanador").textContent = mensaje;
    document.getElementById("modalGanador").style.display = "flex";

    // Deshabilita el botón para que no se siga jugando
    document.getElementById("lanzarDado").disabled = true;
}

// Cerrar el modal con la tecla "Escape"
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        document.getElementById("modalGanador").style.display = "none";
    }
});

// Lanzar con la barra espaciadora
document.addEventListener("keydown", function(event) {
    if (event.key === " " || event.key === "Spacebar") {
        if (ronda <= 3) {
            document.getElementById("lanzarDado").click();
        }
    }
});
