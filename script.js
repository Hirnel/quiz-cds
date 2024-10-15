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