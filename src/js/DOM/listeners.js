import { login, signUp, updateProfileData } from "../api/apiConnectionBack"

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
