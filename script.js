

// Array con las opciones del quiz
const opciones = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"];

// Seleccionar el elemento de la tabla donde se insertarán los botones
const tablaOpciones = document.getElementById('quiz-options');

// Crear los botones y añadirlos a la tabla
opciones.forEach((opcion, index) => {
    // Crear una fila para cada botón
    let fila = document.createElement('tr');
    
    // Crear una celda para el botón
    let celda = document.createElement('td');
    
    // Crear el botón
    let boton = document.createElement('button');
    boton.innerText = opcion;
    boton.style.backgroundColor = ['#ff4b5c', '#ffd31d', '#28df99', '#00bcd4'][index]; // Colores para cada botón

    // Añadir el botón a la celda
    celda.appendChild(boton);
    
    // Añadir la celda a la fila
    fila.appendChild(celda);
    
    // Añadir la fila a la tabla
    tablaOpciones.appendChild(fila);
});

// Manejo del botón "Siguiente"
document.getElementById('next-question').addEventListener('click', () => {
    alert('Siguiente pregunta');
});
