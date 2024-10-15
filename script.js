// Array con las opciones del quiz
const opciones = ["Opción 1", "Opción 2", "Opción 3", "Opción 4"];

// Seleccionar el elemento de la tabla donde se insertarán los botones
const tablaOpciones = document.getElementById('options');

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
if (localStorage.getItem("user") != null) {

}
localStorage.setItem("usuarios", JSON.stringify([])); //iniciar variables

const form = document.getElementById("contactForm");
// const contactList = document.getElementById("contact-list");
// const deleteSelect = document.getElementById("delete-select");
// const deleteAllButton = document.getElementById("delete-all");

form.addEventListener("submit", function (event) {   // exijo la validacion gritando a los cielos add event Listener, y luego declaro que pido
    event.preventDefault();
    const name = document.getElementById("name").value; //variables que recogen informacion 
    const user = document.getElementById("user").value;
    const email = document.getElementById("email").value;
    const efmail = document.getElementById("efmail").value;
    const contact = {
        name, email, user, efmail
    }
    console.log(contact);
    saveContact(contact);
    displayContact(contact);

    form.reset();
})

function saveContact(contact) {         // Funcion que almacena los datos en el localstoreage
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];  // Transforma la cadena obtenida o un array vacio
    contacts.push(contact);    // Introduce los valores en el objeto
    localStorage.setItem('contacts', JSON.stringify(contacts));  // Transformamos en un string
}

function loadContacts() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];  // Transforma la cadena obtenida o un array vacio
    contacts.forEach(contact => displayContact(contact));  // 
}

function displayContact(contact) {
    const contactDiv = document.createElement('div');  // Creamos un div, le damos una clase y le añadimos
    contactDiv.classList.add('contact');                // codigo html

    contactDiv.innerHTML = `
        <p>Usuario: ${contact.user}</p>
        <p>Nombre: ${contact.name}</p>
        <p>Email: ${contact.email}</p>
        
        ${contact.imageUrl ? `<img src="${contact.imageUrl}" alt="Imagen de ${contact.name}">` : ''}
    `;
    contactList.appendChild(contactDiv);
}

deleteSelect.addEventListener("click", function () { })

function checkEmail() {
    let email = document.getElementById("email");
    const regExpPw = /^(([gree^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regExpPw.test(email.value)) {
        email.style.borderColor = "red";
    } else {
        email.style.borderColor = "green";
    }
};

function saveContact(contact) {
    let contacs = JSON.parse(localStorage.getItem("contacts")) || [];
    contacs.push(contact);
    localStorage.setItem("contacts", JSON.stringify(contacs))
}

deleteAllButton.addEventListener("click", function () {
    // alert para asegurar
    localStorage.clear();

})

link.addEventListener('click', function(event) {
    // Evitar que el enlace redirija de inmediato
    
    event.preventDefault();

    // Incrementa el contador de clics
    clickCount++;

    if (clickCount === 3) {
        // Redirigir después de 3 clics
        window.location.href = "https://www.youtube.com/watch?v=uE-1RPDqJAY"; // Cambia la URL por la que necesites
    } else {
        // Mostrar en la consola cuántos clics ha hecho el usuario :3
        console.log(`Has hecho ${clickCount} clic(s). Necesitas 3 clics para continuar.`);
    }

});