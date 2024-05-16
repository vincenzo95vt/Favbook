import { fetchMethods, getSearchUrl } from "../apiFunctions";
import { createProfileCard, createCardUser, createLogin, createSignUp, createCardProduct } from "../../DOM/create-dom";
import { addPostBox } from "../../DOM/homeHTMLElements";
import { mapUserData, mapPostData } from "../../mappers/mapper";
import { fetchPosts } from "../posts/fetchPosts";
import { changePrivacy } from "../../DOM/utils-dom";
const stringedData = localStorage.getItem("data")
export const userData = JSON.parse(stringedData)


export async function getUserDetails(){
    try {
        const token = localStorage.getItem("token")
        const url = getSearchUrl("user", "profileUser")
        const methods = fetchMethods("GET", {"auth-token": token})
        const response = await fetch(url, methods);
        const data = await response.json();
        console.log(data)

        //Comprobamos errores
        if(data.status === 404) return console.error("cannot search the data")
        const userData = await mapUserData(data.data)
        createProfileCard(userData)
    } catch (error) {
        console.error("Error: Cannot get the data")
    }
    window.onload = async () => {
        await refreshToken()
    }
}

export async function login(){
            
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    
    const emailValue = emailInput.value
    const passwordValue = passwordInput.value

    try { 
        
        const url = getSearchUrl("user", "login")
        const methods = fetchMethods("POST", {"Content-type":"application/json"}, {email: emailValue, password: passwordValue})
        const response = await fetch(url, methods);
        const data = await response.json();
        console.log(data)
        //Comprobamos errores
        if(data.status === "unauthorize"){
            alert(data.message)
            createLogin()
            return
        }else if(data.status === "success") {
            //Quitamos token del localstorage si existen.
            
            //Guardamos el token  en localStorage para futuras peticiones
            localStorage.setItem('token', data.token);
            localStorage.setItem("token_refresh", data.token_refresh);
            //Aqui vamos a poner la ruta para redirigir la pagina hacia otro sitio una vez que el login sea correcto.
            // await createProfileCard()
        };

        const userData = await mapUserData(data.data)
        localStorage.setItem("userId", userData.id)
        //Guardamos en LocalStorage userData para recogerlo cuando nos haga falta.
        localStorage.setItem("data", JSON.stringify(userData))
        const posts = await fetchPosts()
        posts.forEach(post =>{
            const mappedPost = mapPostData(post)
            addPostBox(mappedPost)
        })
        
    } catch (error) {
        console.error("Error: Cannot get the data")
    }
    window.onload = async () => {
        await refreshToken()
    }
    
}

export async function refreshToken(){
    try {
        const token_refresh = localStorage.getItem("token_refresh");
        console.log(token_refresh);
        const url = getSearchUrl("user", "refreshToken")
        const methods = fetchMethods("POST",{"auth-token": token_refresh})
        const response = await fetch(url, methods);
        //Si algo falla de repente puede ser por esta funcion de refreshToken. 
        const newData = await response.json();

        if(newData) {
            localStorage.setItem('token', newData.token);
            localStorage.setItem("token_refresh", newData.token_refresh);
        }
        return await fetchPosts()
    } catch (error) {
        console.error("Error refreshing token:", error)
    }
}

export async function signUp() {
    try {
        const name = document.getElementById("name")
        const lastName = document.getElementById("last-name")
        const age = document.getElementById("age")
        const userName = document.getElementById("userName")
        const email = document.getElementById("email")
        const password = document.getElementById("password")
        const confirmPassword = document.getElementById("confirm-password")
        const genre = document.getElementById("select-option")

        const nameValue = name.value
        const lastNameValue = lastName.value
        const userNameValue = userName.value
        const ageValue = age.value
        const genreValue = genre.value
        const emailValue = email.value
        const passValue = password.value
        const confPassValue = confirmPassword.value

        if(passValue !== confPassValue){
            alert("Las contraseñas escritas no son iguales.")
            createSignUp()
        }
        const requestedBody = {
            name: nameValue,
            lastName: lastNameValue,
            userName: userNameValue,
            age: ageValue,
            email: emailValue, 
            password: confPassValue,
            genre: genreValue
            }
        
        const url = getSearchUrl("user", "signUp")
        const methods = fetchMethods("POST", {"Content-Type": "application/json"}, requestedBody)
        const response = await fetch(url, methods)
        const data = await response.json()
        if(response.status === 409) return alert(data.message)
        //Vamo a comprobar que el usuario no exista ya en la base de datos.
        if(data){
            createLogin()
        }
    } catch (error) {
        console.error("Error fetching register posts:", error);
    }
}

export async function updateProfileData(){
    try {
        const userName = document.getElementById("update-userName")
        const name = document.getElementById("update-name")
        const lastName = document.getElementById("update-last-name")
        const description = document.getElementById("update-description")
        const privacy = document.getElementById("privacy")


        const userNameValue = userName.value
        const nameValue = name.value
        const lastNameValue = lastName.value
        const descriptionValue = description.value
        const privacyValue = changePrivacy(privacy.value)

        const requestBody = {};
        if(userNameValue.trim() !== ""){
            requestBody.userName = userNameValue
        }if(nameValue.trim() !== ""){
            requestBody.name = nameValue
        }if(lastNameValue.trim() !== ""){
            requestBody.lastName = lastNameValue
        }if(descriptionValue.trim() !== ""){
            requestBody.description = descriptionValue
        }if(privacyValue.trim() !== ""){
            requestBody.privacy = privacyValue
        }
        
        const token = localStorage.getItem("token")
        console.log(token)
        if(!token) throw new Error("Token not found")

        const url = getSearchUrl("user", "updateUserDetails")
        const methods = fetchMethods("PATCH", {"auth-token": token, "Content-type":"application/json"}, requestBody)
        const response = await fetch(url, methods);
        console.log(response)
        const data = await response.json()
        if(data.status === 401){
            alert("You are logged out due to inactivity.")
        }
        else{
            getUserDetails()
        }

    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

export async function searchApi(){

    // Obtener el valor de búsqueda del input
    const searchInput = document.getElementById("valueSearch");
    const searchValue = searchInput.value;
    console.log(searchValue);

    try {
        // BUSCAR USUARIOS
        const userResponse = await fetch(`http://localhost:4000/user/getuser/${searchValue}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const userData = await userResponse.json();

        // Verificar si no se encontraron usuarios
        if (userData.length === 0) {
            // Enviar respuesta con mensaje de éxito y sin usuarios encontrados
            res.status(200).json({
                status: "success",
                message: "Not users found"
            });
        } else {
            // Mapear los datos de usuario
            const data = mapUserData(userData);
            // Crear tarjeta de usuario
            createCardUser(userData.data);
        }

        // BUSCAR PRODUCTOS
        const productsResponse = await fetch(`http://localhost:4000/posts/getProducts/${searchValue}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const productoData = await productsResponse.json();

        // Verificar si no se encontraron productos
        if (productoData.length === 0) {
            // Enviar respuesta con mensaje de éxito y sin productos encontrados
            res.status(200).json({
                status: "success",
                message: "Not users found"
            });
        } else {
            //Mapear lo datos de producto
            const product = mapPostData(productoData);
            //crear tarjeta de usuario
            createCardProduct(productoData.product);
        }


    } catch (error) {
        // Capturar y manejar errores
        console.log("Error al realizar la búsqueda", error.message);
    }

};








