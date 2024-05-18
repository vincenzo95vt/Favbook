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
    const commentElem = document.getElementById("comment")
    const commentValue = commentElem.value
    console.log(commentValue)
    const idPost = id
    const token = localStorage.getItem("token")

    const requestBody = {}
    requestBody.comment = commentValue

    try {
        const response = await fetch(`http://localhost:4000/posts/addNewReview/${id}`, {
            method: "POST", 
            headers: {
                "auth-token": token
            },
            body:requestBody
        });;
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
        }else return data.data
                    
    } catch (error) {
        console.error("Error: Cannot get the data", error.message)

    }

}
