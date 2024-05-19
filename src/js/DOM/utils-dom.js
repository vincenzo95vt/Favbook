import {createSignUp, createLogin, createCardUser} from "../DOM/create-dom"
import { searchUsers,  userData } from "../api/users/fetchUsers"
import { searchProduct } from "../api/posts/fetchPosts"

export function loginOrSignUp(){
    const appElem = document.getElementById("app")
    appElem.addEventListener("click", (e)=>{
        const eventClicked = e.target.className
        if(eventClicked === "not-user"){
            createSignUp()
        }else if(eventClicked === "sign-in")
            createLogin()
    } )
}

export function changePrivacy(value){
    if(value === "Privado") return "private"
    return "public"
}
export function listenerForSignUp(){
    const signUpElem = document.getElementById("signup-card")
    signUpElem.addEventListener("submit", (event) => {
        event.preventDefault()
        signUp()
    })
}

export function searchutil(){
    // bucamos por su Id
    const searchElemtn = document.getElementById("form-search")
    // Escucha de evento 
     searchElemtn.addEventListener("submit", (event) => {
        // Evita el comportamiento predeterminado
        event.preventDefault()
         searchUsers()
    })
};

export function searchUtilProduct(){
    //Bucamos por el id 
    const utilProduct = document.getElementById("form-search-product")
     utilProduct.addEventListener("submit", (event) => {
        event.preventDefault()
        searchProduct()
     })

};

export function noProductsFoundCard(nameSearched){
    const appElem = document.getElementById("app")
    appElem.innerHTML = ""
    const divElem = document.createElement("div")
    divElem.innerHTML= `
    <div>
        <span>No hemos encontrado el post ${nameSearched}, por favor danos algo mas de informacion o prueba de nuevo con otro nombre.</span>
    </div>
    `
    appElem.appendChild(divElem)
    return divElem
}

export function noUsersFoundCard(nameSearched){
    const appElem = document.getElementById("app")
    appElem.innerHTML = ""
    const divElem = document.createElement("div")
    divElem.innerHTML= `
    <div>
        <span>No hemos encontrado el usuario ${nameSearched}, por favor danos algo mas de informacion o prueba de nuevo con otro nombre.</span>
    </div>
    `
    appElem.appendChild(divElem)
    return divElem
}

export function dateToNewFormat(dateToCovert){
    const date = new Date(dateToCovert)
    const day = date.getDate().toString().padStart(2, '0'); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); 
    const year = date.getFullYear().toString().slice(-2);
    const hour = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year}  ${hour}:${minutes}`
    return formattedDate 
}



