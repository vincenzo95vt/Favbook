import { loginOrSignUp } from "./utils-dom";
import { listenerForEditProfile, listenerForGetUserProfile, listenerForLogin, listenerForSignUp, listenerForUpdateProfile } from "./events";
import {
    imgAndName,
    imgAndNameUpdated,
    description,
    descriptionUpdated,
    nameAndLastName,
    nameAndLastNameUpdated,
    submitBtn,
    goToProfileSubmit,
    editProfile,
    createHeader
} from "./profileHTMLElemens";
import { addPostBox } from "./homeHTMLElements";



export function createHomePage() {
    createHeader(value)
    addPostBox(value)
}

export function createUpdateProfileCard(value) {
    createHeader(value)
    const appElem = document.getElementById("app")
    appElem.innerHTML = ""
    const elemContainer = document.createElement("div")
    appElem.appendChild(elemContainer)
    elemContainer.className = "container-info-updating"
    const divElem = document.createElement("form")
    elemContainer.appendChild(divElem)
    divElem.id = "update-user"
    divElem.className = "profile-container"
    const submitContainer = document.createElement("div")
    submitContainer.className = "submit-container"
    divElem.appendChild(imgAndName(value))
    divElem.appendChild(nameAndLastName(value))
    divElem.appendChild(description(value))
    submitContainer.appendChild(submitBtn())
    submitContainer.appendChild(goToProfileSubmit())
    divElem.appendChild(submitContainer)
    listenerForUpdateProfile()
    listenerForGetUserProfile()
    return divElem
}
export function createProfileCard(value) {

    const appElem = document.getElementById("app")
    appElem.innerHTML = ""
    const divElem = document.createElement("div")
    divElem.id = "profile-userdata"
    divElem.className = "profile-container"
    divElem.append(editProfile(value))
    divElem.appendChild(imgAndNameUpdated(value))
    divElem.appendChild(nameAndLastNameUpdated(value))
    divElem.appendChild(descriptionUpdated(value))
    appElem.appendChild(divElem)
    listenerForEditProfile()
    return divElem
}

export function createLogin() {
    loginOrSignUp()
    const appElem = document.getElementById("app")
    appElem.innerHTML = `
    <div id="login-box">
    <h2 class="login-title">Iniciar sesión</h2>
        <form id="controllers" action="">
            <div class= "info-container">
                <input id="email" type="email" name="user" placeholder="Correo Electrónico">
                <input id="password" type="password" name="password" placeholder="Contraseña">
            </div>
            <div class="login-button">
                <button class="submit-button" type="submit">Confirmar</button>
            </div>
        </form>
    <a class="not-user">¿No estas registrado?</a>`
    listenerForLogin()
}

export function createSignUp() {
    const appElem = document.getElementById("app")
    appElem.innerHTML = `
    <form id="signup-card" action="">
    <p class="title">Registro </p>
    <p class="message">Regístrese ahora y obtenga acceso completo a nuestra aplicación. </p>
    <div id="signup-container" class="flex">
        <label>
            <input id="name" required placeholder="Nombre" type="text" class="input">   
        </label>
        <label>
            <input id="last-name" required placeholder="Apellidos" type="text" class="input"> 
        </label>
        <label>
            <input id= "age" required placeholder="Edad" type="text" class="input">  
        </label>
    </div>  
    <label>
        <select name="genero" id="select-option" >
            <option disabled selected value="">Genero</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
        </select>
        <input id= "userName" required placeholder="Nombre de usuario" type="text" class="input">   
    </label>   
    <label>
        <input id="email" required placeholder="Email" type="email" class="input"> 
    </label> 
    <label>
        <input id="password" required placeholder="Contraseña" type="password" class="input">
    </label>
    <label>
        <input id="confirm-password" required placeholder="Confirmar Contraseña" type="password" class="input">
       
    </label>
    <div id="send">
        <button class="submit-button" type="submit">Enviar</button>
    </div>
    <p>Ya tiene una cuenta <a class="sign-in">Accede aquí</a></p>
</form>`
    listenerForSignUp()
}




//Funcion para crear la tarjeta del usuario 
export function createCardUser(userData) {
    //obtener le elememento del Dom con el id "app"
    const appElem = document.getElementById("app")
    // Varible para almacenar el contenido de la tarjera 
    let content = ''

    //iterar sobre cada objeto de usuario en el array userData
    userData.forEach(user => {

        //Agregar el Html de la tarjeta de usuario al contenido
        content += `
            <div class="card-client">
            <div class="user-picture">
                <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                </svg>
            </div>
            <p class="name-client">     
                <span>${user.name}</span>
            </p>
            <p class="name-client">   
            <span>${user.email}</span>
            </p>
            <p class="name-client">   
            <span>${user.description}</span>
            </p>
            <div class="social-media">
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                    </svg>
                    <span class="tooltip-social">Twitter</span>
                </a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"></path>
                    </svg>
                    <span class="tooltip-social">Instagram</span>
                </a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                        <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                    </svg>
                    <span class="tooltip-social">Facebook</span>
                </a>
                <a href="#">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"></path>
                    </svg>
                    <span class="tooltip-social">LinkedIn</span>
                </a>
            </div>
        </div>
        `
    });

    appElem.innerHTML = content;

};

// Funcion para crear carta de producto 
export function createCardProduct(productoData){
    console.log(productoData)
// Obtener el elemento del Dom por el id "app"
const appElemt = document.getElementById("app")
 
let content = ''

    //iterar sobre cada objeto de producto en el array productoData
    productoData.forEach(posts => {

        //Agregar el Html de la tarjeta de producto al contenido
        content += `
        <div class="card">
            <div class="card-img">${posts.userPoster}</div>
            <div class="card-info">
                <p class="text-title">${posts.postName} </p>
                <p class="text-body">${posts.description}</p>
            </div>
            <div class="card-footer">
                <span class="text-title">499€</span>
                <div class="card-button">
                    <svg class="svg-icon" viewBox="0 0 20 20">
                        <path d="M17.72,5.011H8.026c-0.271,0-0.49,0.219-0.49,0.489c0,0.271,0.219,0.489,0.49,0.489h8.962l-1.979,4.773H6.763L4.935,5.343C4.926,5.316,4.897,5.309,4.884,5.286c-0.011-0.024,0-0.051-0.017-0.074C4.833,5.166,4.025,4.081,2.33,3.908C2.068,3.883,1.822,4.075,1.795,4.344C1.767,4.612,1.962,4.853,2.231,4.88c1.143,0.118,1.703,0.738,1.808,0.866l1.91,5.661c0.066,0.199,0.252,0.333,0.463,0.333h8.924c0.116,0,0.22-0.053,0.308-0.128c0.027-0.023,0.042-0.048,0.063-0.076c0.026-0.034,0.063-0.058,0.08-0.099l2.384-5.75c0.062-0.151,0.046-0.323-0.045-0.458C18.036,5.092,17.883,5.011,17.72,5.011z"></path>
                        <path d="M8.251,12.386c-1.023,0-1.856,0.834-1.856,1.856s0.833,1.853,1.856,1.853c1.021,0,1.853-0.83,1.853-1.853S9.273,12.386,8.251,12.386z M8.251,15.116c-0.484,0-0.877-0.393-0.877-0.874c0-0.484,0.394-0.878,0.877-0.878c0.482,0,0.875,0.394,0.875,0.878C9.126,14.724,8.733,15.116,8.251,15.116z"></path>
                        <path d="M13.972,12.386c-1.022,0-1.855,0.834-1.855,1.856s0.833,1.853,1.855,1.853s1.854-0.83,1.854-1.853S14.994,12.386,13.972,12.386z M13.972,15.116c-0.484,0-0.878-0.393-0.878-0.874c0-0.484,0.394-0.878,0.878-0.878c0.482,0,0.875,0.394,0.875,0.878C14.847,14.724,14.454,15.116,13.972,15.116z"></path>
                    </svg>
                </div>
            </div>
        </div>
        `
    });

    appElemt.innerHTML = content;

};

