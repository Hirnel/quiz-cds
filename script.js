// Si el array de localStorage existe y es mayor que 0, no borrar 
//aseguramos de que haya siempre un item llamado Games
if (!localStorage.getItem("Games")) {
    localStorage.setItem("Games", JSON.stringify([]));
}

// ----------------------------------------------------------------------------------------------------- 

const apiEasy = "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple";
const apiMedium = "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple";
const apiHard = "https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&type=multiple";

//  // ------------------------------------------------------------------------------------------------------

// // Funciones para recibir la información de las API y transformarla en objetos
// // Easy
// async function getQuestionsEasy() {
//     try {
//         const response = await fetch(apiEasy);

//         if (!response.ok) {
//             console.error('Error al leer la API');
//             throw new Error('Error en la respuesta de la API');
//         }

//         const data = await response.json();
//         const results = data.results;

//         let questions = [];
//         let correctAnswers = [];
//         let incorrectAnswers = [];

//         results.forEach(item => {
//             questions.push(item.question);
//             correctAnswers.push(item.correct_answer);
//             incorrectAnswers.push(item.incorrect_answers);
//         });

//         // Transformar los arrays en un array de objetos
//         const questionObjects = results.map((item, index) => ({
//             question: questions[index],
//             correctAnswer: correctAnswers[index],
//             incorrectAnswers: incorrectAnswers[index]
//         }));

//         return questionObjects;

//     } catch (error) {
//         console.error('Error:', error);
//     }

//     //printData(questionObjects);
// }
// // Medium
// async function getQuestionsMedium() {
//     try {
//         const response = await fetch(apiMedium);

//         if (!response.ok) {
//             console.error('Error al leer la API');
//             throw new Error('Error en la respuesta de la API');
//         }

//         const data = await response.json();
//         const results = data.results;

//         let questions = [];
//         let correctAnswers = [];
//         let incorrectAnswers = [];

//         results.forEach(item => {
//             questions.push(item.question);
//             correctAnswers.push(item.correct_answer);
//             incorrectAnswers.push(item.incorrect_answers);
//         });

//         // Transformar los arrays en un array de objetos
//         const questionObjects = results.map((item, index) => ({
//             question: questions[index],
//             correctAnswer: correctAnswers[index],
//             incorrectAnswers: incorrectAnswers[index]
//         }));

//         return questionObjects;

//     } catch (error) {
//         console.error('Error:', error);
//     }
// }
// //Hard
// async function getQuestionsHard() {
//     try {
//         const response = await fetch(apiHard);

//         if (!response.ok) {
//             console.error('Error al leer la API');
//             throw new Error('Error en la respuesta de la API');
//         }

//         const data = await response.json();
//         const results = data.results;

//         let questions = [];
//         let correctAnswers = [];
//         let incorrectAnswers = [];

//         results.forEach(item => {
//             questions.push(item.question);
//             correctAnswers.push(item.correct_answer);
//             incorrectAnswers.push(item.incorrect_answers);
//         });

//         // Transformar los arrays en un array de objetos
//         const questionObjects = results.map((item, index) => ({
//             question: questions[index],
//             correctAnswer: correctAnswers[index],
//             incorrectAnswers: incorrectAnswers[index]
//         }));

//         return questionObjects;

//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// Función principal para cargar las preguntas desde la API y pintar la primera pregunta

let aciertos = 0;  // Variable para contar aciertos
let fallos = 0;    // Variable para contar fallos

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
        mostrarResultadosFinales();  // Mostrar resultados al terminar
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
        aciertos++;  // Incrementar aciertos si la respuesta es correcta
    } else {
        fallos++;  // Incrementar fallos si la respuesta es incorrecta
    }

    // Avanzar a la siguiente pregunta
    pintarPregunta(quizData, currentIndex + 1);
}

// Función para mostrar los resultados finales al terminar el cuestionario
function mostrarResultadosFinales() {
    const resultadoElement = document.getElementById('resultado');
    resultadoElement.innerHTML = `
        <p>Has completado el cuestionario.</p>
        <p>Aciertos: ${aciertos}</p>
        <p>Fallos: ${fallos}</p>
    `;
}

// Función principal para cargar las preguntas desde la API y pintar la primera pregunta
async function getQuestions() {
    try {
        const response = await fetch(apiEasy);

        if (!response.ok) {
            console.error('Error al leer la API');
            throw new Error('Error en la respuesta de la API');
        }

        const data = await response.json();
        const results = data.results;

        let questions = [];
        let correctAnswers = [];
        let incorrectAnswers = [];

        results.forEach(item => {
            questions.push(item.question);
            correctAnswers.push(item.correct_answer);
            incorrectAnswers.push(item.incorrect_answers);
        });
        
        const questionObjects = results.map((item, index) => ({
            question: questions[index],
            correctAnswer: correctAnswers[index],
            incorrectAnswers: incorrectAnswers[index]
        }));

        // Pintamos la primera pregunta
        pintarPregunta(questionObjects, 0);  

    } catch (error) {
        console.error('Error:', error);
    }
}


getQuestions();

// EVENTOS

document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar el botón usando su ID
    let button = document.getElementById('start-btn');

    // Verificar si el botón existe
    if (button) {
        // Añadir un event listener al botón para ejecutar una función cuando se haga clic
        button.addEventListener('click', function() {
            // Usar console.log() para verificar que el evento click está ocurriendo
            console.log('Botón clicado!');

            // Redirigir a question.html cuando se hace clic en el botón
            location.href = '../pages/question.html'; // Cambia la ruta si es necesario
        });
    } else {
        console.error('No se encontró el botón con ID start-btn');
    }
});
// ------------------------------------------------------------------------------------------------



// Conseguir con 10 preguntas nuestras, guardadas en un array de objetos, se pueda jugar a nuestro Quiz. [{..},{..},{..}...{..}]



// Mostrar en la Home con una gráfica los resultados de las últimas partidas jugadas (leer puntuaciones de LocalStorage). Representar Fecha(eje X) vs Puntuación(eje Y)


// Almacenar la puntuación de cada partida en un array de objetos [{..},{..},{..}...{..}] en Local Storage. Guardar puntuación y fecha en cada objeto del array

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
    data: [0, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    score: Infinity // Calcular la puntuación después de crear el objeto
};
console.log("Objeto sin sumar score: ")
console.log(game)

//  SUMAR PUNTUACIÓN E INTRODUCIR EN EL OBJETO
// Acceder sólo al array para sumar puntuación
let dataResults = game.data;
console.log("Array de aciertos dentro del objeto: ")
console.log(dataResults)

// Sumar puntuación
game.score = dataResults.reduce(
    (acc, current) => acc + current, 0,);
console.log("Objeto con score sumado: ")
console.log(game)

// Almacenar objeto en array de objetos
let games = [];
games.push(game)

// ALMACENAR OBJETO EN WEB STORAGE
function updateGames(game) {
    localStorage.setItem("Games", JSON.stringify(games));
}

updateGames(game);


// PINTAR GRÁFICA CON FECHA + SCORE
let arrayFechas = []; // Eje Y
games.forEach(game => arrayFechas.push(game.date))

let arrayScores = []; // Eje X
games.forEach(game => arrayScores.push(game.score))

console.log(arrayFechas, arrayScores)

function printGraphic() {
    new Chartist.Line('.chart', {
        labels: arrayFechas,
        series: [
            arrayScores
        ]
    }, {
        high: 10,
        low: 0,
        fullWidth: true,
        // As this is axis specific we need to tell Chartist to use whole numbers only on the concerned axis
        axisY: {
            onlyInteger: true,
            offset: 20
        }
    });

    const ctx = document.getElementById('chart2');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: arrayFechas,
      datasets: [{
        label: '# of Votes',
        data: arrayScores,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// Poner comentado cómo será cuando venga de LocalStorage

printGraphic();

// Llamamos a la función al cargar la página

