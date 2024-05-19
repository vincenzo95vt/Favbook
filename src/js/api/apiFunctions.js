export function getSearchUrl(value, controller=null, id=null) {
    //Hice esta funcion para ahorrarnos lineas de codigo, en el primer parametro, le pasamos la ruta que queremos coger, si usuarios o publicaciones
    //En el siguiente parametro, le pasamos el endpoint que queremos acceder y en el tercero el "id", por si hiciera falta en algun endpoint.
    //Os preguntareis que hay algunos endpoints que no les hacen falta controllers y si "id", pero no pasa nada, ya que igualmente el tercer parametro va a ser nulo.
    //Por lo tanto controller en ese caso seria el id.
    if (!value) {
        throw new Error('You dont provide any params to build a URL');
    }else if(id !== null){
        return `http://localhost:4000/${value}/${controller}/${id}`
    }else if(controller !== null){
        return `http://localhost:4000/${value}/${controller}`
    }
    return `http://localhost:4000/${value}/`;
}

export function fetchMethods(type, header, body = null) {
    //Esta funcion, es la segunda parte de la funcion de arriba, aqui pondremos los methods. 
    //Si le pasamos o no body, que por defecto sera nulo. 
    
    if (!type || !header) {
        throw new Error('Methods and headers are necessary to config methods');
    }
    const methods = {
        method: type,
        headers: header,
    };
    if (body !== null) {
        methods.body = JSON.stringify(body);
    }

    return methods;
}


export function handleTokenExpired(){    
    alert("Su sesión ha caducado, se redigirá directamente al login. ");
    localStorage.clear();
    loginPage();
}