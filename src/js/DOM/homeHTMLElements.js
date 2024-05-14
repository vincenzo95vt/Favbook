import { fetchPosts } from "../api/apiConnectionBack";
import { createHeader } from "./profileHTMLElemens";
import { userData } from "../api/apiConnectionBack";

export function addPostBox(value){
    createHeader(userData)
    const divElem = document.createElement("div")
    const appElem = document.getElementById("app")
    appElem.innerHTML = ""
    appElem.appendChild(divElem)
    divElem.innerHTML = ` 
        <div>
            <h2>${value.userPoster}</h2>
            <h2>${value.postName}</h2>
            <img src=${value.post}></img>
            <p>${value.description}</p>
            <p>${value.date}<p>
        <div>
    `
}




// export function addPostBox(value){
//     const divApp =  document.getElementById('app');
//     const  newDiv = document.createElement("div");
//     divApp.appendChild(newDiv)
//     divApp.appendChild(addProfileData(value))
//     divApp.appendChild(addImgPost(value))
// }

// //Me he quedado aqui, para añadir el home a la pagina.


// function addProfileData(value){
//     const newDiv = document.createElement("div")
//     const otherDiv = document.createElement("div")
//     const newH2 = document.createElement("h2")
//     newH2.className = "profile-username"
//     newH2.innerHTML = `${value}` //Aqui iria el nombre de usuario que nos traeremos de la api nuestra.
//     otherDiv.appendChild(newH2)
//     newDiv.appendChild(profileImg())
//     newDiv.appendChild(otherDiv)
// }

// function profileImg(value) {
//     const newImg = document.createElement("img")
//     newImg.className = "img-profile"
//     newImg.src = value //Ruta de la imagen de perfil del usuario.
//     newImg.alt = "Profile Picture"
// }

// function addImgPost(value){
//     const newImg = document.createElement("img")
//     newImg.className ="post-image";
//     newImg.src= value.post; //Aqui iria el url que le vamos a pasar por parametros "value"    
// }



