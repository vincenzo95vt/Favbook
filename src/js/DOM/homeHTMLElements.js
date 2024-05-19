import { mapComments, mapUserData } from "../mappers/mapper";
import { clearAllFavourites, listenerForAddComments, listenerForSeeComments } from "./events";
import { dateToNewFormat } from "./utils-dom";

export function addPostBox(value){
    
    const appElem = document.getElementById("app")
    const divElem = document.createElement("div")
    const userCreatorMapped = mapUserData(value.userPoster)
    const formattedDate = dateToNewFormat(value.date)
    divElem.className = "appDiv"
    appElem.appendChild(divElem)
    divElem.innerHTML = ` 
        <div class="postCard" id="postCard-${value._id}">
            <h2>${userCreatorMapped.userName}</h2>
            <h2>${value.postName}</h2>
            <div class="img-and-info">
                <img src=${value.post}></img>
                <p>${value.description}</p>
                <div class="container-date-comments">
                    <p>${formattedDate}</p>
                    <svg xmlns="http://www.w3.org/2000/svg" class="addComments" id-add-post="" id="add-${value._id}" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve" width="20" height="20">
                    <g>
                        <path d="M480,224H288V32c0-17.673-14.327-32-32-32s-32,14.327-32,32v192H32c-17.673,0-32,14.327-32,32s14.327,32,32,32h192v192   c0,17.673,14.327,32,32,32s32-14.327,32-32V288h192c17.673,0,32-14.327,32-32S497.673,224,480,224z"/>
                    </g>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="favourites-${value._id}" width="512" height="512"><g id="_01_align_center" data-name="01 align center"><path d="M17.5.917a6.4,6.4,0,0,0-5.5,3.3A6.4,6.4,0,0,0,6.5.917,6.8,6.8,0,0,0,0,7.967c0,6.775,10.956,14.6,11.422,14.932l.578.409.578-.409C13.044,22.569,24,14.742,24,7.967A6.8,6.8,0,0,0,17.5.917ZM12,20.846c-3.253-2.43-10-8.4-10-12.879a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,7.967h2a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,7.967C22,12.448,15.253,18.416,12,20.846Z"/></g></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="viewComments"  id="see-comments-${value._id}" data-name="Layer 1" viewBox="0 0 24 24" width="512" height="512"><path d="m12,0C5.383,0,0,5.383,0,12s5.383,12,12,12h12v-12C24,5.383,18.617,0,12,0Zm11,23h-11c-6.065,0-11-4.935-11-11S5.935,1,12,1s11,4.935,11,11v11Zm-10-11c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Zm5,0c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Zm-10,0c0,.552-.448,1-1,1s-1-.448-1-1,.448-1,1-1,1,.448,1,1Z"/></svg>
                    </div>
                </div>
                <div class="sendComments" id="comment-form-${value._id}">
                    <label for="comment">Comentario:</label><br>
                    <textarea id="comment-${value._id}" id-post=${value._id} name="comment" rows="auto" cols="30" placeholder ="¡Escribe aquí tu comentario!">
                    </textarea><br>
                    <div class="submit-cancel"> 
                        <button id="submit-${value._id}">Enviar
                    </div>
                    </div>
                <div class="postCard-comments" id="app-comments-${value._id}" >

            </div>
        <div>
    ` 
    listenerForAddComments(value._id)
    listenerForSeeComments(value._id)     
    clearAllFavourites(value._id);   
    return divElem
}

export function addPreviousComments(data, id){
    let commentsHTML = ""; 

    data.forEach(comment => {
        console.log(comment)
        const mappedComment = mapComments(comment);
        const formattedDate = dateToNewFormat(mappedComment.date)
        commentsHTML += `
            <div>
                <p>${mappedComment.usuario.userName}</p>
                <p>${mappedComment.content}</p>
                <p>${formattedDate}</p>
            </div>
        `;
    });

    const commentElem = document.getElementById(`app-comments-${id}`);
    commentElem.innerHTML = commentsHTML; 
    return commentElem;
};






