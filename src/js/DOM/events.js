import { addNewComment, fetchPosts, getUserDetails, login, signUp, updateProfileData } from "../api/apiConnectionBack"
import { createUpdateProfileCard } from "./create-dom"
import { userData } from "../api/apiConnectionBack"
import { addCommentField, addPostBox } from "./homeHTMLElements"
import { mapPostData } from "../mappers/mapper"

export function listenerForLogin(){
    const loginElem = document.getElementById("controllers")
    loginElem.addEventListener("submit", (event) => {
        event.preventDefault()   
        login()
        
    })

}

export function listenerToSeeProfile(){
    const appElem = document.getElementById("app-profile")
    appElem.addEventListener('click',()=>{
        getUserDetails()
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

export function listenerForGetPosts(){
    const appElem = document.getElementById("app-posts")
    appElem.addEventListener("click", async ()=> {
        const posts = await fetchPosts()
        posts.forEach(post =>{
            const mappedPost = mapPostData(post)
            addPostBox(mappedPost)
        })
    })
}

export function listenerForEditProfile(){
    const btnElem = document.getElementById("btnEdit")
    btnElem.addEventListener("click", ()=>{
        console.log(userData)
        createUpdateProfileCard(userData)
    })
}

export function listenerForAddCommentsField(){
    const cmntElem = document.getElementById("comments")
    cmntElem.addEventListener("click", (e)=>{
        const clickElem = e.target
        const idElem = clickElem.getAttribute("id-post")
        console.log(idElem)
        addCommentField(idElem)
    })
}

export function listenerForAddComments(){
    const formElem = document.getElementById("comment-form")
    formElem.addEventListener("submit", (event)=>{
        event.preventDefault()
        addNewComment()

        //ME HE QUEDADO AQUI, QUITANDO QUE CADA VEZ QUE ENVIE EL COMENTARIO SE ME REINICIE LA PAGINA. 
    })
}


