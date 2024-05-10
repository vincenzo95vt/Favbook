import { popUpWindow, loginOrSignUp } from "./utils-dom";
import { listenerForLogin, listenerForSignUp, listenerForUpdateProfile } from "./listeners";
import { getUserDetails } from "../api/apiConnectionBack";


export function createUpdateProfileCard(value){
    const appElem = document.getElementById("app")
    appElem.innerHTML = ""
    const divElem = document.createElement("form")
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
    appElem.appendChild(divElem)
    listenerForUpdateProfile()
    return divElem
}
export function createProfileCard(value){
    
    const appElem = document.getElementById("app")
    appElem.innerHTML = ""
    const divElem = document.createElement("div")
    divElem.id = "profile-userdata"
    divElem.className = "profile-container"
    divElem.appendChild(imgAndNameUpdated(value))
    divElem.appendChild(nameAndLastNameUpdated(value))
    divElem.appendChild(descriptionUpdated(value))
    appElem.appendChild(divElem)
    return divElem
}

function description(){
    const descriptionElem = document.createElement("div")
    const description = document.createElement("h4")
    description.innerHTML = "Descripcion:"
    const descriptionInput = document.createElement("textarea")
    descriptionInput.id = "update-description"
    descriptionElem.appendChild(description)
    descriptionElem.appendChild(descriptionInput)
    descriptionElem.className = "description-container"
    return descriptionElem
}

function nameAndLastName(value){
    const nameElem = document.createElement("h4")
    nameElem.innerHTML = "Nombre:"
    const nameInput = document.createElement("input")
    nameInput.type = "text"
    nameInput.placeholder = value.name
    nameInput.id = "update-name"
    const lastNameInput = document.createElement("input")
    lastNameInput.type = "text"
    lastNameInput.placeholder = value.lastName
    lastNameInput.id = "update-last-name"
    const nameAndLastName = document.createElement("div")
    nameAndLastName.className = "name-container"
    nameAndLastName.appendChild(nameElem)
    const inputElem = document.createElement("div")
    inputElem.className = "input-group"
    inputElem.appendChild(nameInput)
    inputElem.appendChild(lastNameInput)
    nameAndLastName.appendChild(inputElem)
    return nameAndLastName
}

function imgAndName(value){
    const imgAndName = document.createElement("div")
    const imgProfile = document.createElement("img")
    imgProfile.src= value.imgProfile
    imgProfile.className = "profile-img"
    const userNameProfile = document.createElement("h3")
    const divElem = document.createElement("div")
    divElem.className = "profile-userName"
    userNameProfile.innerHTML = "Username:"
    const userNameInput = document.createElement("input")
    userNameInput.type = "text"
    userNameInput.placeholder = value.userName
    userNameInput.id = "update-userName"
    divElem.appendChild(userNameProfile)
    divElem.appendChild(userNameInput)
    imgAndName.appendChild(imgProfile)
    imgAndName.appendChild(divElem)
    imgAndName.className = "img-username-container"
    return imgAndName
}

function submitBtn(){
    const btnSubmit = document.createElement("button")
    btnSubmit.innerText ="Actualizar"
    btnSubmit.id ="submit-update"
    btnSubmit.type = "submit"
    return btnSubmit
}

function goToProfileSubmit(){
    const btnSubmit = document.createElement("button")
    btnSubmit.innerText ="Ir al perfil"
    btnSubmit.id ="button-go-profile"
    btnSubmit.type = "button"
    return btnSubmit
}

function imgAndNameUpdated(value){
    const imgAndName = document.createElement("div")
    const imgProfile = document.createElement("img")
    imgProfile.src= value.imgProfile
    imgProfile.className = "profile-img"
    const userNameProfile = document.createElement("h3")
    const divElem = document.createElement("div")
    divElem.className = "profile-userName"
    userNameProfile.innerHTML = "Username:"
    const userNameInput = document.createElement("h4")
    userNameInput.innerHTML = value.userName
    userNameInput.id = "userName"
    divElem.appendChild(userNameProfile)
    divElem.appendChild(userNameInput)
    imgAndName.appendChild(imgProfile)
    imgAndName.appendChild(divElem)
    imgAndName.className = "img-username-container"
    return imgAndName
} 

function nameAndLastNameUpdated(value){
    const nameElem = document.createElement("h4")
    nameElem.innerHTML = "Nombre:"
    const nameInput = document.createElement("h5")
    nameInput.innerHTML = value.name
    nameInput.id = "name"
    const lastNameInput = document.createElement("h5")
    lastNameInput.innerHTML = value.lastName
    lastNameInput.id = "last-name"
    const nameAndLastName = document.createElement("div")
    nameAndLastName.className = "name-container"
    nameAndLastName.appendChild(nameElem)
    const inputElem = document.createElement("div")
    inputElem.className = "info-group"
    inputElem.appendChild(nameInput)
    inputElem.appendChild(lastNameInput)
    nameAndLastName.appendChild(inputElem)
    return nameAndLastName
}

function descriptionUpdated(value){
    const descriptionElem = document.createElement("div")
    const description = document.createElement("h4")
    description.innerHTML = "Descripcion:"
    const descriptionInput = document.createElement("p")
    descriptionInput.innerHTML= value.description
    descriptionInput.id = "description"
    descriptionElem.appendChild(description)
    descriptionElem.appendChild(descriptionInput)
    descriptionElem.className = "container-description-updated"
    return descriptionElem
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


