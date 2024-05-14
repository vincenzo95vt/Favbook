import { loginOrSignUp } from "./utils-dom";
import { listenerForEditProfile, listenerForGetUserProfile, listenerForLogin, listenerForSignUp, listenerForUpdateProfile } from "./events";
import { getUserDetails } from "../api/apiConnectionBack";
import { imgAndName,
    imgAndNameUpdated, 
    description, 
    descriptionUpdated, 
    nameAndLastName, 
    nameAndLastNameUpdated, 
    submitBtn, 
    goToProfileSubmit,
    editProfile, 
    createHeader } from "./profileHTMLElemens";
import { addPostBox } from "./homeHTMLElements";


export function createHomePage(){
    createHeader(value)
    addPostBox(value)
}

export function createUpdateProfileCard(value){
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
export function createProfileCard(value){
    
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

export function createLogin(){
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

export function createSignUp(){
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