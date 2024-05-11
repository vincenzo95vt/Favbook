import { createLogin, createUpdateProfileCard, createProfileCard, createSignUp } from "../DOM/create-dom";
import { mapUserData } from "../mappers/mapper";
 
export async function updateProfileData(){
    try {
        const userName = document.getElementById("update-userName")
        const name = document.getElementById("update-name")
        const lastName = document.getElementById("update-last-name")
        const description = document.getElementById("update-description")

        const userNameValue = userName.value
        const nameValue = name.value
        const lastNameValue = lastName.value
        const descriptionValue = description.value

        const requestBody = {};
        if(userNameValue.trim() !== ""){
            requestBody.userName = userNameValue
        }if(nameValue.trim() !== ""){
            requestBody.name = nameValue
        }if(lastNameValue.trim() !== ""){
            requestBody.lastName = lastNameValue
        }if(descriptionValue.trim() !== ""){
            requestBody.description = descriptionValue
        }

        const token = localStorage.getItem("token")
        console.log(token)
        if(!token){
            throw new Error("Token not found")
        }

        const response = await fetch(`http://localhost:4000/user/updateUserDetails`,{
            method: "PATCH",
            headers:{
                "auth-token": token,
                "Content-type":"application/json"
            },
            body: JSON.stringify(requestBody)
        });

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

async function fetchPosts(){
    try {
        const token = localStorage.getItem("token")
        if(!token){
            throw new Error("Token not found");
        }
        const response = await fetch("http://localhost:4000/posts", {
            headers: {
                "auth-token": token
            },
        });

        if(response.status === 200){
            const data = await response.json()
            console.log(data)
            return data.data
        }else if(response.status === 400) {
            //Token caducado, llamar a refreshToken en caso de no haberse ejecutado. 

            await refreshToken();

        }else{
            throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data = await response.json()
        console.log(data) //Vamos a ver que nos devuelve para manejar los datos a nuestra manera.

        const posts = data.data;
        return posts
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
}

//Hay que hacer otros endpoints, los de registrar usuario y publicaciones.

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

        const response = await fetch("http://localhost:4000/user/signUp", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameValue,
                lastName: lastNameValue,
                userName: userNameValue,
                age: ageValue,
                email: emailValue, 
                password: confPassValue,
                genre: genreValue
                }
            ),
        })
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


async function refreshToken(){
    try {
        const token_refresh = localStorage.getItem("token_refresh");
        console.log(token_refresh);
        const response = await fetch("http://localhost:4000/user/refreshToken", {
            method:"POST",
            headers:{
                "auth-token": token_refresh,
                }
            }
        );
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

export async function getUserDetails(){
    try {
        
        const token = localStorage.getItem("token")
        const response = await fetch("http://localhost:4000/user/profileUser", {
            method: "GET", 
            headers: {
                "auth-token": token,
            }            
        });
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
        const response = await fetch("http://localhost:4000/user/login", {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email: emailValue, password: passwordValue}),
        });
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
        createUpdateProfileCard(userData)
    } catch (error) {
        console.error("Error: Cannot get the data")
    }
    window.onload = async () => {
        await refreshToken()
    }
    
}

