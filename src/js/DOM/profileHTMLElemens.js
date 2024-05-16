import { searchutil } from "./utils-dom"
import { listenerForGetPosts, listenerToSeeProfile } from "./events"

export function description(){
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


export function nameAndLastName(value){
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

export function privateProfile(){
    const selectElem = document.createElement("select")
    selectElem.id = "privacy" 
    const publicOption = document.createElement("option")
    publicOption.textContent ="Publico"
    const privateOption = document.createElement("option")
    privateOption.textContent="Privado"
    selectElem.appendChild(publicOption)
    selectElem.appendChild(privateOption)
    return selectElem
}

export function imgAndName(value){
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
    divElem.appendChild(privateProfile(value))
    imgAndName.appendChild(imgProfile)
    imgAndName.appendChild(divElem)
    imgAndName.className = "img-username-container"
    return imgAndName
}

 export function submitBtn(){
    const btnSubmit = document.createElement("button")
    btnSubmit.innerText ="Actualizar"
    btnSubmit.id ="submit-update"
    btnSubmit.type = "submit"
    return btnSubmit
}

export function goToProfileSubmit(){
    const btnSubmit = document.createElement("button")
    btnSubmit.innerText ="Ir al perfil"
    btnSubmit.id ="button-go-profile"
    btnSubmit.type = "button"
    return btnSubmit
}

export function imgAndNameUpdated(value){
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

export function editProfile(){
    const btnElem = document.createElement("button")
    btnElem.id="btnEdit"
    btnElem.textContent = "Editar perfil" 
    return btnElem
}

export function nameAndLastNameUpdated(value){
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

export function descriptionUpdated(value){
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

export function  createHeader(value){
    const headerElem = document.getElementById("app-header")
    headerElem.innerHTML= ` 
    <div class="ppal-navbar">
    <ul class="main-menu">
        <li class="main-menu-img"><a href=""><img src="https://cdn-icons-png.flaticon.com/512/25/25698.png" alt="Logo de la empresa"></a></li>
        <li class="main-menu-text"><a id="app-posts">Publicaciones</a></li>
        <li class="main-menu-text"><a>Favoritos</a></li>
    </ul>
    <form id="form-search" class="search-bar" role="search">
        <input id="valueSearch" class="search-input" type="search" placeholder="  Escriba algo..." aria-label="Search">
        <button id="valueButton "class="search-button" type="submit">Buscar</button>
    </form>
    <ul class="main-menu">
        <li class="main-menu-text"><a href=""></a>${value.userName}</li>
        <li class="main-menu-img"><a  id="app-profile"><img  src=${value.imgProfile} alt="Foto del usuario"></a></li>
    </ul>
</div>
    `
    searchutil()
    listenerForGetPosts()
    listenerToSeeProfile()
}
