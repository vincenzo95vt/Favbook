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

export function createCardUserSearched(data){
    const appElem = document.getElementById("app")
    if(data.privacy === "private"){
        appElem.innerHTML = `
        <div class="container-users-details">
            <svg class="candado" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 508.779 508.779" style="enable-background:new 0 0 508.779 508.779;" xml:space="preserve" width="512" height="512">
            <g>
                <path fill="#fff" d="M403.723,180.395v-31.061C403.723,66.859,336.864,0,254.389,0S105.056,66.859,105.056,149.333v31.061   c-39.236,20.023-63.952,60.334-64,104.384v106.667c0.071,64.772,52.561,117.263,117.333,117.333h192   c64.772-0.071,117.263-52.561,117.333-117.333V284.779C467.675,240.729,442.959,200.417,403.723,180.395z M254.389,64   c47.128,0,85.333,38.205,85.333,85.333v18.112H169.056v-18.112C169.056,102.205,207.261,64,254.389,64z M403.723,391.445   c0,29.455-23.878,53.333-53.333,53.333h-192c-29.455,0-53.333-23.878-53.333-53.333V284.779c0-29.455,23.878-53.333,53.333-53.333   h192c29.455,0,53.333,23.878,53.333,53.333V391.445z"/>
                <path fill="#fff" d="M243.723,295.445h21.333c17.673,0,32,14.327,32,32l0,0c0,17.673-14.327,32-32,32h-21.333c-17.673,0-32-14.327-32-32l0,0   C211.723,309.772,226.05,295.445,243.723,295.445z"/>
            </g>
            </svg>

        </div>
        `
    }else if(data.privacy === "public"){
        const userFollowers = data.followersCount
        const userFollowing = data.followingCount
        const listCount = data.lists
        appElem.innerHTML= `
            <div class="container-users-details">
                <div class="user-img-follows">
                        <img src="${data.imgProfile}" alt="" class="userImg">
                    <div class="following-followers">
                        <div class="followers">
                            <span>Followers:</span>
                            <span class="count">${userFollowers}</span>
                        </div>
                        <div class="following">
                            <span>Following:</span>
                            <span  class="count">${userFollowing}</span>
                        </div>
                    </div>
                </div>
                <div class="container-personal-info">
                    <span class="userName">${data.userName}</span>
                    <span class="name-lastName">${data.name} ${data.lastName}</span>
                    <span class="age">${data.age}</span>
                </div>
                <div class="description-and-name">    
                    <span class="description">${data.description}</span>
                    <span class="lists">My favourites lists: ${listCount}</span>
                </div>
            </div>
        `
    }
}