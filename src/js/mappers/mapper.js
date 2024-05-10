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
        genre: data.genre ?? defaultValue
    }
}