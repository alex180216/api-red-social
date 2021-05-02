/*Creamos una funcion de agregar nueva autenticacion que recibe un req.params 
o req.body (data), esta funcion lo que hará es crear un nuevo usuario 
en la tabla 'auth' de nuestra bd dummycon id, username y password
*/ 

const store = require('../../../store/dummy')
const TABLA = 'auth'

const newAuth = (data) =>{
    const authData = {
        id:data.id
    }

    if(data.username){
        authData.username = data.username
    }
    if(data.password){
        authData.password = data.password
    }

    return store.upsert(TABLA, authData)
}

module.exports = {
    newAuth
}