


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