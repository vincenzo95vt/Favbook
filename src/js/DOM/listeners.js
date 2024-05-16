import { createList, getUserDetails, login, signUp, updateProfileData } from "../api/apiConnectionBack"
import { createListBuilder, createUpdateProfileCard } from "./create-dom"
import { changePrivacy } from "./utils-dom"
import { userData } from "../api/apiConnectionBack"

export function listenerForLogin(){
    const loginElem = document.getElementById("controllers")
    loginElem.addEventListener("submit", (event) => {
        event.preventDefault()   
        login()
        
    })

}

export function listenerForSignUp(){
    const signUpElem = document.getElementById("signup-card")
    signUpElem.addEventListener("submit", (event) => {
        event.preventDefault()
        console.log("he entrado")
        signUp()
    })
}

export function listenerForUpdateProfile(){
    const updElem = document.getElementById("update-user")
    updElem.addEventListener('submit', (event) =>{
        event.preventDefault()
        console.log("Entré")
        updateProfileData()
    })
}

export function listenerForGetUserProfile(){
    const profileBtn = document.getElementById("button-go-profile")
    profileBtn.addEventListener("click", ()=>{
        getUserDetails()
        console.log("He entrado")
    })
}

export function listenerForEditProfile(){
    const btnElem = document.getElementById("btnEdit")
    btnElem.addEventListener("click", ()=>{
        console.log(userData)
        createUpdateProfileCard(userData)
    })
}

export function listenerForOptionsInProfile(){
    const btnElem = document.getElementById("app-profile")
    btnElem.addEventListener("click", () =>{

    })
}

export function listenerForCreateList(){
    const createListElem = document.getElementById("send-list")
    createListElem.addEventListener("submit", () => {
        console.log("he entrado lista creada")
        createList();
    })
}

export function listenerForCreateList2(){
    const createList = document.getElementById("create-list");
    createList.addEventListener("click", () => {
        console.log("he entrado listas")
        createListBuilder()
    })
}