import { addNewComment, fetchPosts, getPostById } from "../api/posts/fetchPosts"
import { createList, getUserDetails, login, signUp, updateProfileData, userData } from "../api/users/fetchUsers"
import { createListBuilder, createUpdateProfileCard } from "./create-dom"
import { addPostBox, addPreviousComments } from "./homeHTMLElements"
import { mapComments, mapPostData } from "../mappers/mapper"
import { createHeader } from "./profileHTMLElemens"


export function listenerForLogin(){
    const loginElem = document.getElementById("controllers")
    console.log("entro")
    const appElem = document.getElementById("app")
    loginElem.addEventListener("submit", (event) => {
        login()
        appElem.innerHTML = ""
        createHeader(userData)
        
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
    const divElem = document.getElementById("app")
    appElem.addEventListener("click", async ()=> {
        divElem.innerHTML = ""
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

// export function listenerForAddCommentsField(value){
//     const cmntElem = document.getElementById(`add-${value}`)
//     const containerField = document.getElementById(`comment-form-${value}`)
//     cmntElem.addEventListener("click", async (e)=>{
//         if(containerField.style.display === "none"){
//             containerField.style.display = "block"
//         }
//             containerField.style.display = "none"
            
        
//     })
// }

export function listenerForAddComments(value){
    const formElem = document.getElementById(`submit-${value}`)
    formElem.addEventListener("click", ()=>{
        const idPost =  value
        console.log("entra por listener de añadir comentarios", idPost)
        addNewComment(idPost)
    })
}

export function listenerForSeeComments(value){
    const formElem = document.getElementById(`see-comments-${value}`)
    formElem.addEventListener("click", async () =>{
        const data = await getPostById(value)
        const comments = data.comments
        addPreviousComments(comments, value)
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