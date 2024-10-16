// Si el array de localStorage existe y es mayor que 0, no borrar 
//aseguramos de que haya siempre un item llamado Games
let games = [];

if (!localStorage.getItem("Games")) {
    localStorage.setItem("Games", JSON.stringify([]));
} else {
    games = JSON.parse(localStorage.getItem("Games"));
}

// ----------------------------------------------------------------------------------------------------- 
// PARAMETRIZAR
const apiEasy = "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple";
const apiMedium = "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple";
const apiHard = "https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&type=multiple";


//  // ------------------------------------------------------------------------------------------------------

// ALMACENAR OBJETO EN WEB STORAGE

function updateGames(games) {
    let localGames = JSON.parse(localStorage.getItem('Games'))
    localGames.push(games)
    localStorage.setItem("Games", JSON.stringify(games));
}

// Función principal para cargar las preguntas desde la API y pintar la primera pregunta


// Obtener fecha en formato Día/Mes/Hora
let currentDate = new Date();
const day = currentDate.getUTCDate();
const month = currentDate.getUTCMonth() + 1;
const year = currentDate.getUTCFullYear();
// Convertir a String
let dateString = `${day}/${month}/${year}`;

// OBJETO CON FECHA Y RESULTADOS
let game = {
    date: dateString,
    data: [],
    score: Infinity // Calcular la puntuación después de crear el objeto
};

let dataResults = game.data;


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

        // Almacenar objeto en array de objetos
        games.push(game)
        // Sumar puntuación
        game.score = dataResults.reduce((acc, current) => acc + current, 0,);
        // Almacenamos el resultado en localSotreage
        updateGames(games);
        // Cambiamos la ruta a results.html
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
        dataResults.push(1)  // Añade 1 al array games
    } else {
        dataResults.push(0) // Añade 0 al array games
    }

    // Avanzar a la siguiente pregunta
    pintarPregunta(quizData, currentIndex + 1);
}

// Función principal para cargar las preguntas desde la API y pintar la primera pregunta

async function getQuestions() {
    try {
        // Hacer las llamadas a las APIs en paralelo usando Promise.all
        const [responseEasy, responseMedium, responseHard] = await Promise.all([
            fetch(apiEasy),
            fetch(apiMedium),
            fetch(apiHard)
        ]);

        // Verificar que todas las respuestas sean correctas
        if (!responseEasy.ok || !responseMedium.ok || !responseHard.ok) {
            console.error('Error al leer alguna de las APIs');
            throw new Error('Error en la respuesta de alguna de las APIs');
        }

        // Parsear las respuestas a JSON
        const dataEasy = await responseEasy.json();
        const dataMedium = await responseMedium.json();
        const dataHard = await responseHard.json();

        // Combinar todas las preguntas de las tres APIs
        const results = [
            ...dataEasy.results,
            ...dataMedium.results,
            ...dataHard.results
        ];

        let questions = [];
        let correctAnswers = [];
        let incorrectAnswers = [];

        // Procesar los resultados combinados
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

getQuestions();


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
    } else {
        console.error('No se encontró el botón con ID start-btn');
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
            // Redirigir a question.html y cargar preguntas de la API Easy
            location.href = '../pages/question.html'; // Cambia la ruta si es necesario
            localStorage.setItem('apiUrl', 'apiEasy'); // Guarda la API a usar en localStorage
        });
    } else {
        console.error('No se encontró el botón con ID start-btn1');
    }

    if (mediumButton) {
        mediumButton.addEventListener('click', function () {
            console.log('Botón Medium clicado!');
            // Redirigir a question.html y cargar preguntas de la API Medium
            location.href = '../pages/question.html'; // Cambia la ruta si es necesario
            localStorage.setItem('apiUrl', 'apiMedium'); // Guarda la API a usar en localStorage
        });
    } else {
        console.error('No se encontró el botón con ID start-btn2');
    }


    if (hardButton) {
        hardButton.addEventListener('click', function () {
            console.log('Botón Hard clicado!');
            // Redirigir a question.html y cargar preguntas de la API Hard
            location.href = '../pages/question.html'; // Cambia la ruta si es necesario
            localStorage.setItem('apiUrl', 'apiHard'); // Guarda la API a usar en localStorage
        });
    } else {
        console.error('No se encontró el botón con ID start-btn3');
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
    } else {
        console.error('No se encontró el botón con ID play-again-btn');
    }
});


// ------------------------------------------------------------------------------------------------



// Conseguir con 10 preguntas nuestras, guardadas en un array de objetos, se pueda jugar a nuestro Quiz. [{..},{..},{..}...{..}]



// Mostrar en la Home con una gráfica los resultados de las últimas partidas jugadas (leer puntuaciones de LocalStorage). Representar Fecha(eje X) vs Puntuación(eje Y)


// Almacenar la puntuación de cada partida en un array de objetos [{..},{..},{..}...{..}] en Local Storage. Guardar puntuación y fecha en cada objeto del array

// // Obtener fecha en formato Día/Mes/Hora
// let currentDate = new Date();
// const day = currentDate.getUTCDate();
// const month = currentDate.getUTCMonth() + 1;
// const year = currentDate.getUTCFullYear();
// // Convertir a String
// let dateString = `${day}/${month}/${year}`;

// // OBJETO CON FECHA Y RESULTADOS
// let game = {
//     date: dateString,
//     data: [0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
//     score: Infinity // Calcular la puntuación después de crear el objeto
// };
// console.log("Objeto sin sumar score: ")
// console.log(game)

// //  SUMAR PUNTUACIÓN E INTRODUCIR EN EL OBJETO
// // Acceder sólo al array para sumar puntuación
// let dataResults = game.data;
// console.log("Array de aciertos dentro del objeto: ")
// console.log(dataResults)

// // Sumar puntuación
// game.score = dataResults.reduce(
//     (acc, current) => acc + current, 0,);
// console.log("Objeto con score sumado: ")
// console.log(game)

// // Almacenar objeto en array de objetos

// games.push(game)
// console.log(games)
// // ALMACENAR OBJETO EN WEB STORAGE
// function updateGames(games) {
//     localStorage.setItem("Games", JSON.stringify(games));
// }

// updateGames(games);


// // PINTAR GRÁFICA CON FECHA + SCORE
// let arrayFechas = []; // Eje Y
// games.forEach(game => arrayFechas.push(game.date))

// let arrayScores = []; // Eje X
// games.forEach(game => arrayScores.push(game.score))

// console.log(arrayFechas, arrayScores)

// function printGraphic() {

//     const ctx = document.getElementById('chart');

//     new Chart(ctx, {
//         type: 'line',
//         data: {
//             labels: arrayFechas,
//             datasets: [{
//                 label: 'My First Dataset',
//                 data: arrayScores,
//                 fill: false,
//                 borderColor: 'rgb(75, 192, 192)',
//                 tension: 0.1
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     });
// }

// Poner comentado cómo será cuando venga de LocalStorage

// printGraphic();

// Llamamos a la función al cargar la página
function printResult(){
    let divScore = document.querySelector(".score");
    divScore.innerHTML = `<h1>${games[games.length - 1].score}</h1>`;

    
}

printResult()
