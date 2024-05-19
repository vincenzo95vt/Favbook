import '../styles/styles.scss'; 
import { createHomePage, createLogin} from "./DOM/create-dom"
const token = localStorage.getItem("token");
import { userData } from './api/users/fetchUsers';
if(token !== null){
    const appElem = document.getElementById("app")
    appElem.innerHTML = ""
    console.log(userData)
    createHomePage(userData)
}else{

    createLogin()
}
