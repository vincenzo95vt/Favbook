
export function connectionApi(){

    const loginElem = document.getElementById("controllers")
    loginElem.addEventListener("submit", async function(event) {
        event.preventDefault()
        
        
        const emailInput = document.getElementById("email")

        const passwordInput = document.getElementById("password")
        
        const emailValue = emailInput.value
        console.log(emailValue)
        const passwordValue = passwordInput.value
        console.log(passwordValue)



        try {
            const response = await fetch("http://localhost:4000/user/login", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: emailValue, password: passwordValue}),
            });
            const data = await response.json();
            console.log("okey", data)
            //Guardamos el token  en localStorage para futuras peticiones
            if(data) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("token_refresh", data.token_refresh);
            };
            await fetchPosts()
        } catch (error) {
            console.error("Error: Cannot get the data")
    
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
    
                if(response.status === 400) {
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
            await fetchPosts()
            } catch (error) {
                console.error("Error refreshing token:", error)
            }
        }
        window.onload = async () => {
            await refreshToken()
        }
    })
}

//PROBLEMAS PARA CONECTAR BACK CON FRONT.