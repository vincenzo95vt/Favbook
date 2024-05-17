import { fetchMethods, getSearchUrl } from "../apiFunctions";
import { addPostBox } from "../../DOM/homeHTMLElements";
import {refreshToken} from "../users/fetchUsers"
import { mapPostData } from "../../mappers/mapper";

export async function fetchPosts(){
    try {
        const token = localStorage.getItem("token")
        if(!token){
            throw new Error("Token not found");
        }
        const response = await fetch("http://localhost:4000/posts/", {
            headers: {
                "auth-token": token
            },
        });

        if(response.status === 200){
            const data = await response.json()
            const posts = data.data
            console.log(posts)
            return posts;
        }else if(response.status === 400) {
            //Token caducado, llamar a refreshToken en caso de no haberse ejecutado. 

            await refreshToken();

        }else{
            throw new Error(`HTTP error! status: ${response.status}`)
        }        
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

export async function addNewComment(value){
    const commentElem = document.getElementById("comment")
    const commentValue = commentElem.value
    const idPost = value
    
    const token = localStorage.getItem("token")

    const requestBody = {}
    requestBody.comment = commentValue

    try {
        const url = getSearchUrl("posts", "addNewReview", idPost)
        const methods = fetchMethods("POST", {"Content-type":"application/json","auth-token": token }, requestBody)
        const response = await fetch(url, methods);
        const data = await response.json()
        if(data.status === 400){
            alert(data.message)
        }else if(data.status === 404){
            throw new Error('Something went wrong')
        }else if(data.status === 200){
            console.log(data.message)
        }

    } catch (error) {
        console.error("Error: Cannot add the data")

    }
}

export async function getPostById(){
    const token = localStorage.getItem("token")
    const commentElem = document.getElementById("comments")
    const idPost = commentElem.getAttribute("id-post")
    const url = getSearchUrl("posts", idPost)
    const methods = fetchMethods("GET", {"auth-token": token})
    try {
        const response = await fetch(url, methods);
        const data = await response.json()
        console.log("entra")
        if(data.status === "Error"){
                throw new Error('Something went wrong')
        }else if(data.status === "success"){
            console.log(data.data)
            return data.data
        }
                    
    } catch (error) {
        console.error("Error: Cannot get the data", error.message)

    }

}
