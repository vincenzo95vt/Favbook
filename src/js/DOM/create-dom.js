import { loginOrSignUp } from "./utils-dom";
import { addToFavourites, clearAllFavourites, listenerForCreateList, listenerForEditProfile, listenerForGetUserProfile, listenerForLogin, listenerForSignUp, listenerForUpdateProfile, listenerToSeeOtherProfiles } from "./events";
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
import { fetchPosts } from "../api/posts/fetchPosts";
import { addPostBox } from "./homeHTMLElements";
import { mapPostData } from "../mappers/mapper";


export async function createHomePage(value){
    createHeader(value)
    const data = await fetchPosts()
    data.forEach(async (post)=>{
        const mappedData = mapPostData(post)
        // const userIdCreator = post.userCreator
        // const userCreatorName = await getUserCreatorName(userIdCreator)
        // console.log(userCreatorName)
        addPostBox(mappedData)
    })

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
    <div class="login">
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
        <a class="not-user">¿No estas registrado?</a>
    </div>`
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

        if(user.privacy === "private"){
            content += ` 
            <div class="prueba">
            <div class="card-client" id="cardClient-${user._id}">
            <div class="user-picture">
                <svg id="imgProfile" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                </svg>
            </div>
            <p class="name-client">     
                <span>${user.name}</span>
            </p>
            <svg class="candado" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 508.779 508.779" style="enable-background:new 0 0 508.779 508.779;" xml:space="preserve" width="512" height="512">
            <g>
                <path fill="#fff" d="M403.723,180.395v-31.061C403.723,66.859,336.864,0,254.389,0S105.056,66.859,105.056,149.333v31.061   c-39.236,20.023-63.952,60.334-64,104.384v106.667c0.071,64.772,52.561,117.263,117.333,117.333h192   c64.772-0.071,117.263-52.561,117.333-117.333V284.779C467.675,240.729,442.959,200.417,403.723,180.395z M254.389,64   c47.128,0,85.333,38.205,85.333,85.333v18.112H169.056v-18.112C169.056,102.205,207.261,64,254.389,64z M403.723,391.445   c0,29.455-23.878,53.333-53.333,53.333h-192c-29.455,0-53.333-23.878-53.333-53.333V284.779c0-29.455,23.878-53.333,53.333-53.333   h192c29.455,0,53.333,23.878,53.333,53.333V391.445z"/>
                <path fill="#fff" d="M243.723,295.445h21.333c17.673,0,32,14.327,32,32l0,0c0,17.673-14.327,32-32,32h-21.333c-17.673,0-32-14.327-32-32l0,0   C211.723,309.772,226.05,295.445,243.723,295.445z"/>
            </g>
            </svg>
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
        </div>
        `
        }else if(user.privacy === "public"){

            
        
        //Agregar el Html de la tarjeta de usuario al contenido
        content += `
            <div class="card-client" id="cardClient-${user._id}">
            <div class="user-picture">
                <svg id="imgProfile" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
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
        }
    });
    appElem.innerHTML = content;
    userData.forEach(data => {
        listenerToSeeOtherProfiles(data._id);
    })
    
}

export function createListBuilder(){
    const appElem = document.getElementById("app")
    appElem.innerHTML = `
    <div class="lists">
        <form class="form-lists" id="send-list">
            <input id="name" type="name" name="user" placeholder="Nombre de la lista">
            <input id="description" type="text" name="description" placeholder="Descripcion">
            <button type="submit">Crear lista</button>
        </form>
    </div>`
    listenerForCreateList();
}

export function showListsBuilder (value, list ) {
    let listsHTML = "<h2>Mis Listas</h2>"; 

    list.forEach(data => {
        console.log(data)
        console.log(data._id)
        listsHTML += `
        <div>
             <p>Nombre: ${data.name}</p>
             <p>Descripción: ${data.description}</p>
             <svg xmlns="http://www.w3.org/2000/svg" class="addComments" id="addFavourites-${data._id}" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="20" height="20">
                    <g>
                        <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/>
                    </g>
             </svg>
        </div>
        `;
    });
    const postCard = document.getElementById(`postCard-${value}`);
    postCard.innerHTML = listsHTML; 
    list.forEach(data => {
        addToFavourites(value, data._id);
    })
    return postCard;
};

