export function mapUserData(data){
    const defaultValue = "No disponible"
    return  {
        id: data.userId ?? defaultValue,
        userName: data.userName ?? defaultValue,
        name: data.name ?? defaultValue,
        lastName: data.lastName ?? defaultValue,
        age: data.age ?? defaultValue,
        imgProfile: data.imgProfile ?? defaultValue,     
        description: data.description ?? defaultValue, 
        genre: data.genre ?? defaultValue,
        privacy: data.privacy ?? defaultValue
    }
}

export function mapPostData(data){
    const defaultValue = "No disponible"
    return  {
        id: data.userId ?? defaultValue,
        post: data.post ?? defaultValue,
        postName: data.postName ?? defaultValue, 
        userPoster: data.userPoster ?? defaultValue,
        date: data.date ?? defaultValue,    
        description: data.description ?? defaultValue, 
        comments: data.comments ?? defaultValue
    }
}