import { listenerForAddComments, listenerForAddCommentsField, listenerForSeeComments } from "./events";

export function addPostBox(value){
    const appElem = document.getElementById("app")
    const divElem = document.createElement("div")
    appElem.appendChild(divElem)
    const postId = `add-${value.id}`;
    divElem.innerHTML = ` 
        <div id="postCard">
            <h2>${value.userPoster}</h2>
            <h2>${value.postName}</h2>
            <div class="img-and-info">
                <img src=${value.post}></img>
                <p>${value.description}</p>
                <div class="container-date-comments">
                    <p>${value.date}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" id-add-post="${value.id}" id="add" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="20" height="20">
                    <g>
                        <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/>
                    </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" id-post="${value.id}" id="comments" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12h12v-12C24,5.383,18.617,0,12,0Zm11,23h-11c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11v11Zm-10-11c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Zm5,0c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Zm-10,0c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z"/></svg>
                    
                </div>
            </div>
        <div>
    `    
    listenerForAddCommentsField()
    listenerForSeeComments()
}

export function addCommentField(value){
    const postElem = document.getElementById("postCard")
    postElem.innerHTML = `
    <form id="comment-form">
        <label for="comment">Comentario:</label><br>
        <textarea id="comment" id-post=${value} name="comment" rows="4" cols="50" placeholder ="¡Escribe aquí tu comentario!">
        </textarea><br>
        <input type="submit" value="Enviar">
    </form>
    `
    listenerForAddComments()
}

export function addPreviousComments(value){
    const postElem = document.getElementById("postCard")
    postElem.innerHTML = ""
    const liElem = document.createElement("li")
    const pElem = document.createElement("p")
    pElem.textContent = `${value.usuario}`
    const otherElem = document.createElement("p")
    otherElem.textContent = `${value.content}`
    liElem.appendChild(otherElem)
    const anotherElem = document.createElement("p")
    anotherElem.textContent = `${value.date}`
    liElem.appendChild(anotherElem)
    liElem.appendChild(pElem)
    postElem.appendChild(liElem)
    return liElem
}






