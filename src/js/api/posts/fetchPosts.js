import { fetchMethods, getSearchUrl } from "../apiFunctions";
import { addPostBox } from "../../DOM/homeHTMLElements";
import {refreshToken} from "../users/fetchUsers"
import { mapPostData } from "../../mappers/mapper";
import { handleTokenExpired } from "../apiFunctions";
import { noProductsFoundCard } from "../../DOM/utils-dom";

export async function fetchPosts(){
    try {
        const token = localStorage.getItem("token")
        if(!token){
            throw new Error("Token not found");
        }
        const url = getSearchUrl("posts")
        console.log(url)
        const methods = fetchMethods("GET",{"auth-token": token})
        const response = await fetch(url, methods)
        if (response.status === 401 && data && data.message && data.message.includes("Expired token")) {
            handleTokenExpired();
            return; 
        }if(response.status === 200){
            const data = await response.json()
            const posts = data.data
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
    const idPost = id
    const token = localStorage.getItem("token")
    try {
        // const url = getSearchUrl("posts", "addNewReview", `${idPost}`)
        // const methods = fetchMethods("POST", {"Content-Type": "application/json","auth-token": token}, {comment:commentValue})
        // const response = await fetch(url, methods)
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
        handleTokenExpired(data)
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
        handleTokenExpired(data)
        console.error("Error: Cannot get the data", error.message)

    }

}
// _____________________________________
export async function searchProduct() {
    // Obtener el valor de búsqueda del input
    const searchInput = document.getElementById("valueSearch-product");
    const searchValue = searchInput.value;
    console.log(searchValue);
    
    try { 
        if(searchValue ===""){
            return alert("Escribe alguna letra sino... poco vamos a encontrar")
        }
    
        //  BUSCAR PRODUCTOS
        const url = getSearchUrl("posts", "getProducts", `${searchValue}`)
        const methods = fetchMethods("GET", {"Content-Type": "application/json"})
        const response = await fetch(url, methods)
        const productoData = await response.json();
        // Verificar si no se encontraron productos
        if (productoData.data.length === 0) {
            // Enviar respuesta con mensaje de éxito y sin productos encontradosprod
            
            return noProductsFoundCard(searchValue)
        } else {
            //Mapear lo datos de producto
            const arrayProduct = productoData.data
            //crear tarjeta de producto
            const appElem = document.getElementById("app")
            appElem.innerHTML = ""
            arrayProduct.forEach((post) =>{
                const mappedPost = mapPostData(post)
                console.log(mappedPost)
                addPostBox(mappedPost)
            })
           
        }

    } catch (error) {
        // Capturar y manejar errores
        handleTokenExpired(data)
        console.error("Error al realizar la búsqueda", error.message);
    }
};
