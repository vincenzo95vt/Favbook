import { addNewComment, fetchPosts, getPostById } from "../api/posts/fetchPosts"
import { getSearchedUserDetails,  createList, getUserDetails, login, signUp, updateProfileData, userData, getLists, myNewList } from "../api/users/fetchUsers"
import { createProfileCard, createListBuilder, createUpdateProfileCard, showListsBuilder } from "./create-dom"
import { addPostBox, addPreviousComments } from "./homeHTMLElements"
import { mapPostData } from "../mappers/mapper"
import { createCardUserSearched, createHeader } from "./profileHTMLElemens"


export function listenerForLogin(){
    const loginElem = document.getElementById("controllers")
    console.log("entro")
    const appElem = document.getElementById("app")
    loginElem.addEventListener("submit", () => {
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

export function listenerToSeeOtherProfiles(idProfile){
    const idDiv = document.getElementById(`cardClient-${idProfile}`)
    console.log(idProfile)
    idDiv.addEventListener("click", async (e)=>{
        console.log("he entrado en la tarjeta")
        const data = await getSearchedUserDetails(idProfile)
        createCardUserSearched(data)
        console.log(data)
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

export function clearAllFavourites (value) {
    console.log(value)
    const postCard = document.getElementById(`postCard-${value}`)
    console.log(postCard)
    const favourites = document.getElementById(`favourites-${value}`);
    console.log(favourites)
    favourites.addEventListener("click", () => {
        console.log("he entrado a favourites")
        postCard.innerHTML = "";
        getLists(value);
    })
}

export function addToFavourites (postId, id) {
    const addFavourites = document.getElementById(`addFavourites-${id}`)
    addFavourites.addEventListener("click", () => {
        console.log("he entrado a addFavourites")
        myNewList(postId, id)
    })
}