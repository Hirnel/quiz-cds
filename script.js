

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

// Manejo del botón "Siguiente" tiene que ser obligatorio seleccionar una respuesta. 
document.getElementById('next-question').addEventListener('click', () => {
    alert('Siguiente pregunta');
    
});

/* quiero guardar en localStorage: Usuario, email, scores, aciertos, 
*/
// localStorage.setItem(user, email, scores, successes);


// hago dos consts para pedir el id de contact-List y contact-form
if(localStorage.getItem("user") != null){

}
localStorage.setItem("usuarios",JSON.stringify([])); //iniciar variables

const form = document.getElementById("contact-form");
const contactList= document.getElementById("contact-list");
const deleteSelect = document.getElementById("delete-select");
const deleteAllButton = document.getElementById("delete-all");

form.addEventListener("submit", function (event){
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    const contact ={
        name, email
    }
    saveContact(contact);
})

function saveContact(contact){
    let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
    contacts.push (contact);
    localStorage.setItem("contacts", JSON.stringify(contacts))
}

deleteSelect.addEventListener("click", function() {})

function checkEmail() {
    let email = document.getElementById("email");
    const regExpPw = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regExpPw.test(email.value)) {
        email.style.borderColor = "red"; 
    } else {
        email.style.borderColor = "green";
    }
};
function checkEfmail() {
    let email = document.getElementById("efmail");
    const regExpPw = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regExpPw.test(email.value)) {
        email.style.borderColor = "red"; 
    } else {
        email.style.borderColor = "green";
    }
};

