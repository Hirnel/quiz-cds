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
    

