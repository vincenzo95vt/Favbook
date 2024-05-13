import { createCardUser, createLogin, createProfileCard, createSignUp } from "../DOM/create-dom";
import { mapUserData } from "../mappers/mapper";
async function updateProfileData(){
    try {


        const token = localStorage.getItem("token")
        if(!token){
            throw new Error("Token not found")
        }
        const response = await fetch("http://localhost:4000/user",{
            method: "PATCH"
        },{
            headers:{
                "Content-type":"application/json"
            }
        },{
            body: JSON.stringify({
                imgProfile,
                name,
                lastName,
                userName,
                description,
                genre,
                age
            })
        }
    );
        if(response.status === 200){
            const data = await response.json()
            console.log(data)
            return data.data
        }else{
            throw new Error(`HTTP error! status: ${response.status}`)
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
            // await createProfileCard()
        };
        const userData = await mapUserData(data.data)
        createProfileCard(userData)
    } catch (error) {
        console.error("Error: Cannot get the data")
    }
    window.onload = async () => {
        await refreshToken()
    }
    
}

export async function searchApi(){

    const searchInput = document.getElementById("valueSearch")
    const searchValue = searchInput.value
    console.log(searchValue)

  try{
    //BUSCAR A USUARIOS
    const userResponse = await fetch(`http://localhost:4000/user/getuser/${searchValue}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }, 
        
    });
    const userData = await userResponse.json();

    if(userData.length === 0){
         res.status(200).json({
            status: "success",
            message: "Not users found"
         });

    }   
    //pruebas 
          // crear una carta para usuario 
         const data = mapUserData(userData)
         createCardUser(data)
         console.log(data.data)

    // BUSCAR PRODUCTOS 
    const productsResponse = await fetch(`http://localhost:4000/posts/getProducts/${searchValue}`, {
        method:"GET",
        headers: {
            "Content-Type": "application/json",
        },
        
    });
    
    const productoData = await productsResponse.json();
           console.log(userData,productoData)
    if(productoData.length === 0){
        res.status(200).json({
           status: "success",
           message: "Not users found"
        });
   }
                 // crear la carta para producto 

          const dataProducts  = mapUserData(productoData)

  } catch (error) {
    console.log("Error al realizar la busqueda",
     error.message
    );
  }

}

// export async function searchApi() {
//     const searchInput = document.getElementById("valueSearch");
//     const searchValue = searchInput.value;
//     console.log(searchValue);

//     try {
//         // BUSCAR A USUARIOS
//         const userResponse = await fetch(`http://localhost:4000/user/getuser?userName=${searchValue}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json" // Corregido el error de "aplication" a "application"
//             }
//         });
//         const userData = await userResponse.json();

//         // BUSCAR PRODUCTOS 
//         const productsResponse = await fetch(`http://localhost:4000/post/?postName=${searchValue}`, {
//             method: "GET",
//             headers: {
//                 "Content-Type": "application/json" // Corregido el error de "aplication" a "application"
//             }
//         });
//         const productoData = await productsResponse.json();

//         // Mirar si se encontraron resultados 
//         const resultsFound = userData.data.length > 0 || productoData.data.length > 0;
//         if (resultsFound) {
//             console.log("Se encontraron resultados");
//         } else {
//             console.log("No se encontraron resultados");
//         }
//     } catch (error) {
//         console.log("Error al realizar la búsqueda:", error.message);
//     }
// }
