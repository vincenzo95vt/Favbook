import { createLogin, createSignUp } from "../DOM/create-dom";


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
        console.log("he entrado")
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
        console.log(nameValue)
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
        if(response.status === 409) return alert('El nombre de usuario o el correo ya existen')
        const data = await response.json()
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

        //Comprobamos errores
        if(data.status === "unauthorize"){
            alert(data.message)
            createLogin()
            return
        }else if(data.message === "success") {
            //Guardamos el token  en localStorage para futuras peticiones
            localStorage.setItem('token', data.token);
            localStorage.setItem("token_refresh", data.token_refresh);
            //Aqui vamos a poner la ruta para redirigir la pagina hacia otro sitio una vez que el login sea correcto.
        };
        await fetchPosts()
    } catch (error) {
        console.error("Error: Cannot get the data")
    }
    window.onload = async () => {
        await refreshToken()
    }
    
}

