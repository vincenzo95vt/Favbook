import {createSignUp, createLogin, createCardUser,} from "../DOM/create-dom"
import { searchUsers, searchProduct, userData } from "../api/users/fetchUsers"

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
        console.log("he entrado")
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
        //  searchProduct()
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

