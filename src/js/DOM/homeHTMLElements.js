import { fetchPosts } from "../api/apiConnectionBack";
import { createHeader } from "./profileHTMLElemens";
import { userData } from "../api/apiConnectionBack";
import { listenerForAddComments, listenerForAddCommentsField } from "./events";

export function addPostBox(value){
    createHeader(userData)
    const divElem = document.createElement("div")
    const appElem = document.getElementById("app")
    appElem.innerHTML = ""
    appElem.appendChild(divElem)
    divElem.innerHTML = ` 
        <div id="postCard">
            <h2>${value.userPoster}</h2>
            <h2>${value.postName}</h2>
            <div class="img-and-info">
                <img src=${value.post}></img>
                <p>${value.description}</p>
                <div class="container-date-comments">
                    <p>${value.date}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" id-post="${value.id}"id="comments" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12h12v-12C24,5.383,18.617,0,12,0Zm11,23h-11c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11v11Zm-10-11c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Zm5,0c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Zm-10,0c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z"/></svg>
                </div>
            </div>
        <div>
    `    
    listenerForAddCommentsField()
}
export function addCommentField(value){
    const postElem = document.getElementById("postCard")
    postElem.innerHTML = ""
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






