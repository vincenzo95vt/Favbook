import { fetchMethods, getSearchUrl, handleTokenExpired } from "../apiFunctions";
import { createProfileCard, createCardUser, createLogin, createSignUp, createHomePage } from "../../DOM/create-dom";
import { mapUserData, } from "../../mappers/mapper";
import { fetchPosts } from "../posts/fetchPosts";
import { changePrivacy, noUsersFoundCard } from "../../DOM/utils-dom";

const stringedData = localStorage.getItem("data")
export const userData = JSON.parse(stringedData)


export async function getUserDetails(){
    try {
        const token = localStorage.getItem("token")
        const url = getSearchUrl("user", "profileUser")
        const methods = fetchMethods("GET", {"auth-token": token})
        const response = await fetch(url, methods);
        const data = await response.json();
        //Comprobamos errores
        if(data.status === 404) return console.error("cannot search the data")
        const userData = await mapUserData(data.data)
        createProfileCard(userData)
    } catch (error) {
        invalidToken(data)
        console.error("Error: Cannot get the data")
    }
    window.onload = async () => {
        await refreshToken()
    }
}

export async function login(){
            
    const emailInput = document.getElementById("email")
    const passwordInput = document.getElementById("password")
    console.log(emailInput)
    const emailValue = emailInput.value
    const passwordValue = passwordInput.value
    console.log(emailValue)

    try { 
        const url = getSearchUrl("user", "login")
        const methods = fetchMethods("POST", {"Content-type":"application/json"}, {email: emailValue, password: passwordValue})
        const response = await fetch(url, methods);
        const data = await response.json();
        console.log(data.response)
        //Comprobamos errores
        if(data.status === "unauthorize"){
            alert(data.message)
            createLogin()
            return
        }else if(data.status === "success") {
            
            //Guardamos el token  en localStorage para futuras peticiones
            localStorage.setItem('token', data.token);
            localStorage.setItem("token_refresh", data.token_refresh);
            const userData = await mapUserData(data.data)
            const mappedUser = mapUserData(userData)
            //Guardamos en LocalStorage userData para recogerlo cuando nos haga falta.
            
            localStorage.setItem("data", JSON.stringify(userData))
            const appElem = document.getElementById("app")
            appElem.innerHTML = ""
            createHomePage(mappedUser);
        };

    } catch (error) {
        console.error("Error: Cannot get the data", error.message)
    }
    window.onload = async () => {
        await refreshToken()
    }
    
}



export async function refreshToken(){
    try {
        const token_refresh = localStorage.getItem("token_refresh");
        const url = getSearchUrl("user", "refreshToken")
        const methods = fetchMethods("POST",{"auth-token": token_refresh})
        const response = await fetch(url, methods)
        //Si algo falla de repente puede ser por esta funcion de refreshToken.
        const newData = await response.json()
        console.log(newData)

        if(newData) {
            localStorage.setItem('token', newData.token);
            localStorage.setItem("token_refresh", newData.token_refresh);
        }
        const data = await fetchPosts()
        return data
    } catch (error) {
        handleTokenExpired()
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
        invalidToken(data)
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
        const data = await response.json()
        if (response.status === 401 && data && data.message && data.message.includes("Expired token")) {
            handleTokenExpired();
            return; // Detener la ejecución de la función
        }
        if(data.status === 401){
            alert("You are logged out due to inactivity.")
        }
        else{
            getUserDetails()
        }

    } catch (error) {
        console.error("Error fetching posts:", error);

    }
};

// ____________________________________
export async function searchUsers() {
    // Obtener el valor de búsqueda del input
    const searchInput = document.getElementById("valueSearch");
    const searchValue = searchInput.value;
    if(searchValue ===""){
        return alert("Escribe alguna letra sino... poco vamos a encontrar")
    }

    try {
        //  BUSCAR USUARIOS
        const url = getSearchUrl("user", "getuser", `${searchValue}`)
        const methods = fetchMethods("GET", {"Content-Type": "application/json"})
        const response = await fetch(url, methods)
        const userData = await response.json();
        // Verificar si no se encontraron usuarios
        if (userData.data.length === 0) {
            // Enviar respuesta con mensaje de éxito y sin usuarios encontrados
            return noUsersFoundCard(searchValue)
            res.status(200).json({
                status: "success",
                message: "No users found"
            });
        } else {
            // Mapear los datos de usuario
            // Crear tarjeta de usuario
                createCardUser(userData.data);
        }
        

    } catch (error) {
        // Capturar y manejar errores
        invalidToken(userData)
        console.log("Error al realizar la búsqueda por usuarios", error.message);

    }
};

export async function createList() {
    // Obtenemos el id del usuario y lo guardamos en userId
    const userId = userData.id;

    //Cogemos el token del localStorage
    const token = localStorage.getItem("token")

    // Le decimos que guarde el valor del nombre de la lista en la constante nameValue
    const name = document.getElementById("name");
    const nameValue = name.value;

    // Le decimos que guarde el valor de la descripcion de la lista en la constante descriptionValue
    const description = document.getElementById("description");
    const descriptionValue = description.value;

    // Todo esto lo coge bien
    // console.log(userId)
    // console.log(token)
    // console.log(nameValue)
    // console.log(descriptionValue)


    try {
        const response = await fetch(`http://localhost:4000/user/${userId}`, {
            method: "PATCH", 
            headers: {
                "Content-Type": "application/json",
                "auth-token": token,
            },
            body: JSON.stringify({myLists: [{name: nameValue, description: descriptionValue}]}),

        });

        const data = await response.json();
        console.log(data);
        
    } catch (error) {
        console.error("Error: Cannot get the data")
    }
}

// export async function addFavourite () {
//     // Obtenemos el id del usuario y lo guardamos en userId
//     const userId = userData.id;

//     // Obtenemos el token del localStorage
//     const token = localStorage.getItem("token")

//     // Obtenemos el id de la lista en la cual se va a insertar la publicacion
//     const listId = userData.myLists._id
//     console.log(listId)

//     try {
//         const response = await fetch(`http://localhost:4000/user/${userId}`, {
//             method: "PATCH", 
//             headers: {
//                 "Content-Type": "application/json",
//                 "auth-token": token,
//             },

//         });

//         const data = await response.json();
//         console.log(data);        

        
//     } catch (error) {
//         console.error("Error: Cannot push the data", error)
//     }
// }


export async function getSearchedUserDetails(idProfile){
    try {
        const token = localStorage.getItem("token")
        const url = getSearchUrl("user", "getUserDetails", idProfile)   
        const methods = fetchMethods("GET", { "Content-Type": "application/json","auth-token": token})
        console.log(url,methods)
        const response = await fetch(url, methods)
        const userData = await response.json()
        console.log(userData)
        if(userData.status === "Error"){
            console.error("Algo ha ido mal recogiendo los datos")
        }else{
            return userData.data
        }

    } catch (error) {
         // Capturar y manejar errores
         invalidToken(data)
         console.error("Error al realizar la búsqueda", error.message);
    }
}

export async function  getUserCreatorName(id){
    try {
        const token = localStorage.getItem("token")
        const url = getSearchUrl("user", "getName", id)
        console.log(url)   
        const methods = fetchMethods("GET", {"auth-token": token})
        const response = await fetch(url, methods)
        const userData = await response.json()
        console.log(userData)
        if(userData.status === "Error"){
            console.error("Algo ha ido mal recogiendo los datos")
        }else{
            return userData.data
        }
    } catch (error) {
        // Capturar y manejar errores
        console.error("Error al realizar la búsqueda", error.message);
    }
}








