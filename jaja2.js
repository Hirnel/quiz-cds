// If el array de localStorage existe y es mayor que 0, no borrar 
//aseguramos de que haya siempre un item llamado contactos
if (!localStorage.getItem("Contactos")) {
    localStorage.setItem("Contactos", JSON.stringify([]));
}

// Acceder al form y div del body y guardarlos
let form = document.querySelector('form');
// let divLista = document.querySelector("#divLista");
// let contacts = getUsers();   // Cargar contactos existentes
// let ul = document.createElement("ul");
// divLista.appendChild(ul);

// let editing = false; // --------- Variable para controlar si estamos editando o creando
// let currentEmail = ''; // Variable para almacenar el email del contacto a modificar

// FUNCIONES
// Función para actualizar los contactos en localStorage
function actualizarUsers(contacts) {
    localStorage.setItem("Contactos", JSON.stringify(contacts));
}

// Función para obtener los contactos de localStorage
function getUsers() {
    let usersStorage = localStorage.getItem("Contactos");
    return JSON.parse(usersStorage);
}

// // Función para pintar un contacto en una tarjeta
// function pintarUser(contacto) {
//     let li = document.createElement("li");
//     li.setAttribute("data-email", contacto.email);

//     let nombre1 = document.createElement("p");
//     nombre1.textContent = `Nombre: ${contacto.nombre}`;

//     let email1 = document.createElement("p");
//     email1.textContent = `Email: ${contacto.email}`;

//     let mensaje1 = document.createElement("p");
//     mensaje1.textContent = `Mensaje: ${contacto.mensaje}`;
//     // ------ FALTA PINTAR IMG
//     let imagen1 = document.createElement("img");
//     imagen1.setAttribute("src", contacto.imagen);
    

//     // Crear icono para editar
//     let editIcon = document.createElement("span");
//     editIcon.textContent = "✏️";
//     editIcon.style.cursor = "pointer";
//     editIcon.style.marginLeft = "10px";

//     // Añadir evento para editar el contacto
//     editIcon.addEventListener("click", () => {
//         editarUsuario(contacto);
//     });

//     // Unir los elementos al li
//     li.appendChild(nombre1);
//     li.appendChild(email1);
//     li.appendChild(mensaje1);
//     li.appendChild(imagen1);
//     li.appendChild(editIcon);

//     // Añadir el li al ul
//     ul.appendChild(li);
// }

// Función para editar un contacto
// function editarUsuario(contacto) {
//     // Rellenar el formulario con los datos del contacto
//     form.elements.name.value = contacto.nombre;
//     form.elements.email.value = contacto.email;
//     form.elements.comments.value = contacto.mensaje;
//     form.elements.image.value = contacto.imagen;

//     // Cambiar el texto del botón a "Guardar cambios"
//     form.querySelector('button[type="submit"]').textContent = "Guardar cambios";

//     // ----- Marcar que estamos en modo edición
//     editing = true;
//     currentEmail = contacto.email;
// }


// EVENTOS
// Evento de submit
form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Accedemos a cada input del formulario
    let nombre = event.target.elements.fname.value;
    let user = event.target.elements.user.value;
    let email = event.target.elements.email.value;
    
   

    // Crear objeto del contacto
    let contact = {
        nombre: nombre,
        user: user,
        email: email,
        

    };
console.log(contact);
    // ------- Verificar si estamos editando o creando
    // if (editing) {
    //     // Si estamos editando, modificar el contacto existente
    //     const index = contacts.findIndex(currentContact => currentContact.email === currentEmail);
    //     contacts[index] = contact;
    //     editing = false;
    //     currentEmail = '';

    //     // Cambiar texto del botón de vuelta a "Agregar contacto"
    //     form.querySelector('button[type="submit"]').textContent = "Agregar contacto";

    //     // Actualizar el contacto en el DOM
    //     const liToRemove = document.querySelector(`li[data-email="${contact.email}"]`);
    //     // Si existe la tarjeta concreta, eliminarla
    //     liToRemove ? liToRemove.remove() : ""; 
    // } else {
    //     // Si estamos creando, simplemente agregamos el nuevo contacto
    //     contacts.push(contact);
    // }

    // Actualizar el localStorage
    actualizarUsers(contact);

    // Pintar el contacto en el DOM
    pintarUser(contact);

    // Limpiar el formulario
    form.reset();
});


// // Botón para borrar contactos
// let deleteButton = document.querySelector('#botonBorrar');
// deleteButton.addEventListener('click', (event) => {
//     event.preventDefault();
//     const emailBorrar = form.elements.emailBorrar.value;

//     if (emailBorrar === '') {
//         if (confirm("¿Estás seguro de que desea eliminar todos los contactos?")) {
//             localStorage.removeItem("Contactos");
//             divLista.innerHTML = '';
//             contacts = [];
//         }
//     } else {
//         let indice = contacts.findIndex(user => user.email === emailBorrar);
//         if (indice !== -1) {
//             contacts.splice(indice, 1);
//             if (confirm(`¿Estás seguro de que quieres eliminar el contacto con email: ${emailBorrar}?`)) {
//                 let liToRemove = document.querySelector(`li[data-email="${emailBorrar}"]`);
//                 if (liToRemove) {
//                     liToRemove.remove();
//                 }
//                 actualizarUsers(contacts);
//             }
//         }
//     }
// });




document.addEventListener("DOMContentLoaded", function() {
    // Seleccionar los botones
    const easyBtn = document.querySelector('.start-btn1');
    const mediumBtn = document.querySelector('.start-btn2');
    const hardBtn = document.querySelector('.start-btn3');

    // Añadir eventos click para cada botón
    easyBtn.addEventListener('click', function() {
        // Almacenar la dificultad seleccionada en localStorage
        localStorage.setItem('dificultad', 'easy');
        // Redirigir a question.html
        window.location.href = "question.html";
    });

    mediumBtn.addEventListener('click', function() {
        // Almacenar la dificultad seleccionada en localStorage
        localStorage.setItem('dificultad', 'medium');
        // Redirigir a question.html
        window.location.href = "question.html";
    });

    hardBtn.addEventListener('click', function() {
        // Almacenar la dificultad seleccionada en localStorage
        localStorage.setItem('dificultad', 'hard');
        // Redirigir a question.html
        window.location.href = "question.html";
    });
});




/* apis
https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple
https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple
https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&type=multiple
*/


document.addEventListener("DOMContentLoaded", function() {
    // Obtener la dificultad seleccionada desde localStorage
    const dificultad = localStorage.getItem('dificultad');

    // Definir las URLs de las APIs
    const apis = {
        easy: 'https://opentdb.com/api.php?amount=10&category=12&difficulty=easy&type=multiple', 
        medium: 'https://opentdb.com/api.php?amount=10&category=12&difficulty=medium&type=multiple', 
        hard: 'https://opentdb.com/api.php?amount=10&category=12&difficulty=hard&type=multiple' 
    };

    // Seleccionar la API basada en la dificultad
    const apiUrl = apis[dificultad];

    // Hacer la llamada a la API para obtener las preguntas
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Aquí recibes las preguntas de la API
            mostrarPregunta(data[0]); // Mostrar la primera pregunta (ajusta según tu estructura de API)
        })
        .catch(error => {
            console.error('Error al cargar las preguntas:', error);
        });

    // Función para mostrar la pregunta y asignar las opciones a los botones existentes
    function mostrarPregunta(pregunta) {
        const preguntaContainer = document.getElementById('pregunta');
        const botones = document.querySelectorAll('.option'); // Obtener los botones de opción

        // Mostrar el texto de la pregunta
        preguntaContainer.innerText = pregunta.texto; // Asume que "pregunta.texto" tiene el texto de la pregunta

        // Asignar las opciones de respuesta a los botones existentes
        pregunta.opciones.forEach((opcion, index) => {
            if (botones[index]) {
                botones[index].innerText = opcion;
                // Manejar el evento click para cada opción
                botones[index].addEventListener('click', function() {
                    verificarRespuesta(opcion, pregunta.respuestaCorrecta); // Verificar la respuesta
                });
            }
        });
    }

    // Función para verificar si la respuesta es correcta
    function verificarRespuesta(opcionSeleccionada, respuestaCorrecta) {
        if (opcionSeleccionada === respuestaCorrecta) {
            alert('¡Correcto!');
            // Aquí puedes sumar puntos al puntaje y cargar la siguiente pregunta
        } else {
            alert('Incorrecto, la respuesta correcta era: ' + respuestaCorrecta);
        }

        // Llamar a la siguiente pregunta o finalizar el quiz
        // siguientePregunta();
    }
});


