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

export async function addNewComment(id){
    const commentElem = document.getElementById(`comment-${id}`)
    const commentValue = commentElem.value
    console.log(commentValue)
    const idPost = id
    console.log(idPost)
    const token = localStorage.getItem("token")
    console.log("entra por la funcion que lo añade a bbdd", idPost)
    

    try {
        const response = await fetch(`http://localhost:4000/posts/addNewReview/${idPost}`, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
                "auth-token": token
            },
            body:JSON.stringify({comment: commentValue}),

        });
        const data = await response.json()
        console.log(data)
        if(data.status === 400){
            alert(data.message)
        }else if(data.status === 404){
            throw new Error('Something went wrong')
        }else            
         console.log(data.message)
        

    } catch (error) {
        console.error("Error: Cannot add the data", error.message)

    }
}

export async function getPostById(value){
    const token = localStorage.getItem("token")
    const idPost = value
    const url = getSearchUrl("posts", idPost)
    const methods = fetchMethods("GET", {"auth-token": token})
    try {
        const response = await fetch(url, methods);
        const data = await response.json()
        console.log("entra")
        if(data.status === "Error"){
                throw new Error('Something went wrong')
        }else {
            console.log("se añadio correctamente el id", idPost)
            return data.data }
                    
    } catch (error) {
        console.error("Error: Cannot get the data", error.message)

    }

}
