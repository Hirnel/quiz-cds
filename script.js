// Si el array de localStorage existe y es mayor que 0, no borrar 
//aseguramos de que haya siempre un item llamado Games
if (!localStorage.getItem("Games")) {
    localStorage.setItem("Games", JSON.stringify([]));
}


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

// ALMACENAR OBJETO EN WEB STORAGE
function updateGames(game) {
    localStorage.setItem("Games", JSON.stringify(game));
}

updateGames(game);

// ----------------------------------------------------------------------------------------------------- 

const apiEasy = "https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple";
const apiMedium = "https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple";
const apiHard = "https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&type=multiple";


 // ------------------------------------------------------------------------------------------------------

// Funciones para recibir la información de las API y transformarla en objetos
async function getQuestionsEasy() {
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

        // Transformar los arrays en un array de objetos
        const questionObjects = results.map((item, index) => ({
            question: questions[index],
            correctAnswer: correctAnswers[index],
            incorrectAnswers: incorrectAnswers[index]
        }));

        return questionObjects;

    } catch (error) {
        console.error('Error:', error);
    }
}

async function getQuestionsMedium() {
    try {
        const response = await fetch(apiMedium);

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

        // Transformar los arrays en un array de objetos
        const questionObjects = results.map((item, index) => ({
            question: questions[index],
            correctAnswer: correctAnswers[index],
            incorrectAnswers: incorrectAnswers[index]
        }));

        return questionObjects;

    } catch (error) {
        console.error('Error:', error);
    }
}

async function getQuestionsHard() {
    try {
        const response = await fetch(apiHard);

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

        // Transformar los arrays en un array de objetos
        const questionObjects = results.map((item, index) => ({
            question: questions[index],
            correctAnswer: correctAnswers[index],
            incorrectAnswers: incorrectAnswers[index]
        }));

        return questionObjects;

    } catch (error) {
        console.error('Error:', error);
    }
}

//getQuestionsEasy().then(datos => console.log(datos));

// getQuestionsMedium().then(datos => console.log(datos));

// getQuestionsHard().then(datos => console.log(datos));



async function printQuestions(questionObjects) {
    await questionObjects;
    return questionObjects
}

printQuestions().then(datos => console.log(datos))



// const div = document.getElementById('quiz-box')
// const titulo = document.getElementById('pregunta');
// titulo.innerText = "hola";
// div.appendChild(titulo);

// for (let i = 0; i < 10; i++) {  // Bucle for que ocurre 3 veces

    //const div = document.getElementsByClassName('quiz-box')
    // const img = document.createElement('img');
    // const p = document.createElement('p');
    

    // div.appendChild(pregunta);  // Introduce un h3 --> div
    
