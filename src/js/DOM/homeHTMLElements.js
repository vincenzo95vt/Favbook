import { fetchPosts } from "../api/apiConnectionBack";

export function addPostBox(value){
    const divApp =  document.getElementById('app');
    const  newDiv = document.createElement("div");
    divApp.appendChild(newDiv)
    divApp.appendChild(addProfileData(value))
    divApp.appendChild(addImgPost(value))
}

//Me he quedado aqui, para añadir el home a la pagina.


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


