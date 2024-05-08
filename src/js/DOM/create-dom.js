import { popUpWindow } from "./utils-dom";
import { listenerForLogin, listenerForSignUp, loginOrSignUp } from './utils-dom';


export function createProfileCard(value){
    const appElem = document.getElementById("app")
    appElem.innerHTML = ""
    const divElem = document.createElement("div")
    divElem.className = "profile-container"
    divElem.appendChild(imgAndName(value))
    divElem.appendChild(nameAndLastName(value))
    divElem.appendChild(description(value))
    appElem.appendChild(divElem)
    return divElem
}
function description(value){
    const descriptionElem = document.createElement("div")
    const description = document.createElement("p")
    description.innerHTML = value.description
    descriptionElem.appendChild(description)
    descriptionElem.className = "description-container"
    return descriptionElem
}

function nameAndLastName(value){
    const nameElem = document.createElement("h4")
    nameElem.innerHTML = value.name
    const lastNameElem = document.createElement("h4")
    lastNameElem.innerHTML = value.lastName
    const nameAndLastName = document.createElement("div")
    nameAndLastName.className = "name-container"
    nameAndLastName.appendChild(nameElem)
    nameAndLastName.appendChild(lastNameElem)
    return nameAndLastName
}

function imgAndName(value){
    const imgAndName = document.createElement("div")
    const imgProfile = document.createElement("img")
    imgProfile.src= value.imgProfile
    const userNameProfile = document.createElement("h3")
    userNameProfile.innerHTML = value.userName
    imgAndName.appendChild(imgProfile)
    imgAndName.appendChild(userNameProfile)
    imgAndName.className = "img-username-container"
    return imgAndName
}


export function createLogin(){
    loginOrSignUp()
    const appElem = document.getElementById("app")
    appElem.innerHTML = `
    <div id="login-box">
    <h2 class="login-title">Iniciar sesión</h2>
    <div class="controllers-container">
        <form id="controllers" action="">
            <input id="email" type="email" name="user" placeholder="Correo Electrónico">
            <input id="password" type="password" name="password" placeholder="Contraseña">
            <div class="login-button">
            <button class="submit-button" type="submit">Confirmar</button>
            </div>
        </form>
    </div>
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

function addPostBox(){
    const divApp =  document.getElementById('app');
    const  newDiv = document.createElement("div");
    divApp.appendChild(newDiv)
    divApp.appendChild(addProfileData())
    divApp.appendChild(addImgPost())
}

function addProfileData(value){
    const newDiv = document.createElement("div")
    const otherDiv = document.createElement("div")
    const newH2 = document.createElement("h2")
    newH2.className = "profile-username"
    newH2.innerHTML = `${value}` //Aqui iria el nombre de usuario que nos traeremos de la api nuestra.
    otherDiv.appendChild(newH2)
    otherDiv.appendChild(popUpWindow())
    newDiv.appendChild(profileImg())
    newDiv.appendChild(otherDiv)
}

function profileImg(value) {
    const newImg = document.createElement("img")
    newImg.className = "img-profile"
    newImg.src = value //Ruta de la imagen de perfil del usuario.
    newImg.alt = "Profile Picture"
}

function addImgPost(value){
    const newImg = document.createElement("img")
    newImg.className ="post-image";
    newImg.src= value; //Aqui iria el url que le vamos a pasar por parametros "value"    
}


