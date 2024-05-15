import { addNewComment, fetchPosts, getPostById } from "../api/posts/fetchPosts"
import {getUserDetails, login, signUp, updateProfileData, userData} from "../api/users/fetchUsers"
import { createUpdateProfileCard } from "./create-dom"
import { addCommentField, addPostBox, addPreviousComments } from "./homeHTMLElements"
import { mapPostData } from "../mappers/mapper"

export function listenerForLogin(){
    const loginElem = document.getElementById("controllers")
    loginElem.addEventListener("submit", (event) => {
        event.preventDefault()   
        console.log(event)
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
    const cmntElem = document.getElementById("add")
    cmntElem.addEventListener("click", async (e)=>{
        const clickElem = e.target
        const idElem = clickElem.getAttribute("id-add-post")
        addCommentField(idElem)
    })
}

export function listenerForAddComments(){
    const formElem = document.getElementById("comment-form")
    formElem.addEventListener("submit", async (event)=>{
        event.preventDefault()
        addNewComment()
        const posts = await fetchPosts()
            console.log(posts)
            posts.forEach(post =>{
                const mappedPost = mapPostData(post)
                addPostBox(mappedPost)
        })

    })
}

export function listenerForSeeComments(){
    const formElem = document.getElementById("comments")
    formElem.addEventListener("click", async (e) =>{
        const clickElem = e.target
        const idElem = clickElem.getAttribute("id-post")
        console.log("entra")
        const data = await getPostById(idElem)
        const mappedData = mapPostData(data)
        const comments = mappedData.comments
        console.log(comments)
        comments.forEach(comment => addPreviousComments(comment))
    })
}

