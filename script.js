// Si el array de localStorage existe y es mayor que 0, no borrar 
//aseguramos de que haya siempre un item llamado Games
let games = [];

if (!localStorage.getItem("Games")) {
    localStorage.setItem("Games", JSON.stringify([]));
} else {
    games = JSON.parse(localStorage.getItem("Games")) || [];
}


// ----------------------------------------------------------------------------------------------------- 

const apiEasy = "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple";
const apiMedium = "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple";
const apiHard = "https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&type=multiple";

//  // ------------------------------------------------------------------------------------------------------

// ALMACENAR OBJETO EN WEB STORAGE

function updateGames(game) {
    let localGames = JSON.parse(localStorage.getItem('Games')) || [];
    localGames.push(game);
    localStorage.setItem("Games", JSON.stringify(localGames));
}


// Función principal para cargar las preguntas desde la API y pintar la primera pregunta


// Obtener fecha en formato Día/Mes/Hora
let currentDate = new Date();
const day = currentDate.getUTCDate();
const month = currentDate.getUTCMonth() + 1;
const year = currentDate.getUTCFullYear();
let dateString = `${day}/${month}/${year}`;

let game = {
    date: dateString,  // Fecha actual
    data: [],          // Se llenará con 1 o 0 según si las respuestas son correctas o incorrectas
    score: Infinity    // Se calculará una vez que termine el quiz
};

let dataResults = game.data;  // Este será el array donde se guardan los resultados de las respuestas



// Función para mezclar las respuestas

function mezclarRespuestas(correctAnswer, incorrectAnswers) {
    const allAnswers = [...incorrectAnswers, correctAnswer];
    return allAnswers.sort(() => Math.random() - 0.5);  // Mezclar aleatoriamente
}


// Función para pintar las preguntas en el DOM

function pintarPregunta(quizData, index) {
    const preguntaElement = document.getElementById('pregunta');
    const optionButtons = document.querySelectorAll('.option');

    // Verificar si hay más preguntas
    if (index >= quizData.length) {
        // Almacenar el juego completo
        game.score = dataResults.reduce((acc, current) => acc + current, 0); // Calcular la puntuación final
        updateGames(game); // Guardar el juego actual en localStorage

        // Redirigir a la página de resultados
        location.href = '../pages/results.html';
        return;
    }

    // Obtenemos la pregunta y respuestas de la pregunta actual
    const currentQuestion = quizData[index];
    const { question, correctAnswer, incorrectAnswers } = currentQuestion;

    // Mostramos la pregunta
    preguntaElement.innerText = question;

    // Mezclamos las respuestas
    const respuestasMezcladas = mezclarRespuestas(correctAnswer, incorrectAnswers);

    // Asignamos las respuestas mezcladas a los botones
    optionButtons.forEach((button, idx) => {
        button.innerText = respuestasMezcladas[idx];
        button.onclick = () => verificarRespuesta(button.innerText, correctAnswer, quizData, index);
    });
}

// Función para verificar si la respuesta seleccionada es correcta y avanzar a la siguiente pregunta
function verificarRespuesta(respuestaSeleccionada, correctAnswer, quizData, currentIndex) {
    if (respuestaSeleccionada === correctAnswer) {
        dataResults.push(1);  // Añade 1 al array de resultados
    } else {
        dataResults.push(0);  // Añade 0 al array de resultados
    }

    // Avanzar a la siguiente pregunta
    pintarPregunta(quizData, currentIndex + 1);
}

// Función principal para cargar las preguntas desde la API y pintar la primera pregunta

async function getQuestions() {
    try {
        // Obtiene la URL de la API desde el localStorage
        const apiUrl = localStorage.getItem('apiUrl');

        if (!apiUrl) {
            throw new Error("No se encontró ninguna URL de API en localStorage");
        }

        // Hacer la llamada a la API correspondiente
        const response = await fetch(apiUrl);

        // Verificar si la respuesta es correcta
        if (!response.ok) {
            console.error('Error al leer la API');
            throw new Error('Error en la respuesta de la API');
        }

        // Parsear la respuesta a JSON
        const data = await response.json();

        // Procesar los resultados de las preguntas
        const results = data.results;

        let questions = [];
        let correctAnswers = [];
        let incorrectAnswers = [];

        // Procesar los resultados
        results.forEach(item => {
            questions.push(item.question);
            correctAnswers.push(item.correct_answer);
            incorrectAnswers.push(item.incorrect_answers);
        });

        // Crear objetos de pregunta
        const questionObjects = results.map((item, index) => ({
            question: questions[index],
            correctAnswer: correctAnswers[index],
            incorrectAnswers: incorrectAnswers[index]
        }));

        // Pintar la primera pregunta
        pintarPregunta(questionObjects, 0);

    } catch (error) {
        console.error('Error:', error);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    getQuestions(); // Llama a la función cuando la página de preguntas esté cargada
});





// -------------------- EVENTOS ------------------------------------------------

// BOTÓN DE TAKE THE QUIZZ

document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el botón usando su ID
    let button = document.getElementById('start-btn');

    // Verificar si el botón existe
    if (button) {
        // Añadir un event listener al botón para ejecutar una función cuando se haga clic
        button.addEventListener('click', function () {
            // Usar console.log() para verificar que el evento click está ocurriendo
            console.log('Botón clicado!');

            // Redirigir a question.html cuando se hace clic en el botón
            location.href = '../pages/question.html'; // Cambia la ruta si es necesario
        });
    }
});


document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar los botones usando sus IDs
    let easyButton = document.getElementById('start-btn1'); // Botón para el nivel fácil
    let mediumButton = document.getElementById('start-btn2'); // Botón para el nivel medio
    let hardButton = document.getElementById('start-btn3'); // Botón para el nivel difícil

    // Verificar si los botones existen
    if (easyButton) {
        easyButton.addEventListener('click', function () {
            console.log('Botón Easy clicado!');
            localStorage.setItem('apiUrl', apiEasy); // Guarda la API a usar
            location.href = './pages/question.html'; // Redirigir a la página de preguntas
        });
    }

    if (mediumButton) {
        mediumButton.addEventListener('click', function () {
            console.log('Botón Medium clicado!');
            localStorage.setItem('apiUrl', apiMedium); // Guarda la API a usar
            location.href = './pages/question.html'; // Redirigir a la página de preguntas
        });
    }

    if (hardButton) {
        hardButton.addEventListener('click', function () {
            console.log('Botón Hard clicado!');
            localStorage.setItem('apiUrl', apiHard); // Guarda la API a usar
            location.href = './pages/question.html'; // Redirigir a la página de preguntas
        });
    }
});

// BOTÓN DE PLAY AGAIN

document.addEventListener("DOMContentLoaded", function () {
    // Seleccionar el botón usando su ID
    let buttonPlayAgain = document.querySelector('.play-again-btn');

    // Verificar si el botón existe
    if (buttonPlayAgain) {
        // Añadir un event listener al botón para ejecutar una función cuando se haga clic
        buttonPlayAgain.addEventListener('click', function () {
            // Usar console.log() para verificar que el evento click está ocurriendo
            console.log('Botón clicado!');

            // Redirigir a question.html cuando se hace clic en el botón
            location.href = '../index.html'; // Cambia la ruta si es necesario
        });
    }
});


// ------------------------------------------------------------------------------------------------

// // Pintar gráfica con fecha + score
function printGraphic() {

    let arrayFechas = []; // Eje Y
    games.forEach(game => arrayFechas.push(game.date))

    let arrayScores = []; // Eje X
    games.forEach(game => arrayScores.push(game.score))

    const ctx = document.getElementById('chart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: arrayFechas,
            datasets: [{
                label: 'Puntuación por partida',
                data: arrayScores,
                fill: false,
                borderColor: '#540D6E',
                tension: 0.1,
                fill: false,
            }]
        },
        options: {
            maintainAspectRatio: false,
            scales: {
                y: {
                    max: 10,
                    beginAtZero: true
                }
            },
        }
    });

    for (let i = 0; i < arrayFechas.length; i++) {
        let statsList = document.querySelector(".stats-list");
        statsList.innerHTML += `
        <section class="card">
            <article>
                <h3>GAME ${i + 1}</h3>
            </article>
            <article>
                <p>Date: ${arrayFechas[i]}</p>
                <p>Score: ${arrayScores[i]}</p>
            </article>
        </section>
        `     
    }   
}



// Función para imprimir resultado
function printResult() {
    let divScore = document.querySelector(".score");
    divScore.innerHTML = `<h1>${games[games.length - 1].score}</h1>`;
}
// Si estamos en results.html, imprimir resultado
if (document.querySelector(".score")) {
    printResult();
    // Si estamos en index.html, imprimir gráfica
} else if (document.querySelector(".stats-list")) {
    printGraphic();
}

//fire base guarda informacion en DataBase.
/*
const firebaseConfig = {
    apiKey: "AIzaSyBGtDiPeDF16NFSJ9oBL5zp5_DyfCIjQec",
    authDomain: "webquizcds.firebaseapp.com",
    projectId: "webquizcds",
    storageBucket: "webquizcds.appspot.com",
    messagingSenderId: "539239302815",
    appId: "1:539239302815:web:3e743290d173ffa1dc04aa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evita que la página se recargue
    // Obtener los valores del formulario
    const nombre = document.getElementById("fname").value;
    const usuario = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const aceptoTerminos = document.getElementById("accept").checked; // Ver si aceptó los términos
    if (!aceptoTerminos) {
        alert("Debes aceptar los términos legales.");
        return;
    }
    // Registrar al usuario en Firebase Authentication
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Guardar información adicional en Firestore
            db.collection("users").doc(user.uid).set({
                nombre: nombre,
                usuario: usuario,
                email: email,
                personalScore: 0, // Inicializar el personalScore en 0
                globalScore: 0    // Inicializar el globalScore en 0
            })
            .then(() => {
                console.log("Usuario registrado correctamente y datos guardados.");
                alert("Perfil creado exitosamente.");
            })
            .catch((error) => {
                console.error("Error al guardar datos en Firestore: ", error);
                alert("Error al crear el perfil.");
            });
        })
        .catch((error) => {
            console.error("Error al registrar el usuario: ", error);
            alert("Error: " + error.message);
        });
});
*/
