import {createSignUp, createLogin, createCardUser} from "../DOM/create-dom"
import { fetchPosts } from "../api/posts/fetchPosts"
import { searchApi } from "../api/users/fetchUsers"
import { mapPostData } from "../mappers/mapper"
import { addPostBox } from "./homeHTMLElements"
import { createHeader } from "./profileHTMLElemens"

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
    const searchElemtn = document.getElementById("form-search")
     searchElemtn.addEventListener("submit", (event) => {
        event.preventDefault()
        searchApi();
    })

    
}
