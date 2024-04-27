export function popUpWindow(){
    const newSvg = document.createElement("img")
    newSvg.src = "../../public/img/img.svg"
    newSvg.addEventListener("click", () => {
        const newDiv = document.createElement( "div" )
        const otherDiv = document.createElement("div")
        newDiv.className = "popUp-dark-zone"
        otherDiv.className = "popUp-window"
        newDiv.appendChild(otherDiv)
        const reportBtn = document.createElement("button") //Esto no va a hacer nada porque no sabemos como funciona el hecho de reportar un contenido, pero esta bien tenerlo ahi
        const unfollowBtn =  document.createElement("button") //Aqui pegamos la funcion de dejar de seguir a usuario cuando la hagamos. 
        reportBtn.textContent= "Denunciar contenido"
        unfollowBtn.textContent= "Dejar de seguir"
    })
}