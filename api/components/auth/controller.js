/*Creamos una funcion de agregar nueva autenticacion que recibe un req.params 
o req.body (data), esta funcion lo que hará es crear un nuevo usuario 
en la tabla 'auth' de nuestra bd dummycon id, username y password
*/ 

const store = require('../../../store/dummy')
const response = require('../../network/response')
const {generateToken} = require('../../utils/token')

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

const login = async (req, res) =>{
    if(req.body.username && req.body.password){
        const data = await store.query(TABLA, req.body.username)
        if(data){
            //GENERAMOS TOKEN
            const cuerpo = {"message": "Login exitoso",
                            "token" : generateToken(data) 
                        }

            response.success(req, res, cuerpo, 200)
        }else{
            response.error(req, res, 'Credenciales invalidas', 400)
        }
    }else{
        response.error(req, res, 'Necesito un username y un password', 400)
    }
    
    
}

module.exports = {
    newAuth,
    login
}