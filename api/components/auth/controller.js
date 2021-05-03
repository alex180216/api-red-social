const {hash, compare} = require('bcrypt')

const store = require('../../../store/dummy')
const response = require('../../network/response')
const {generateToken} = require('../../utils/token')

const TABLA = 'auth'

const newAuth = async (data) =>{
    const authData = {
        id:data.id
    }

    if(data.username){
        authData.username = data.username
    }
    if(data.password){
        authData.password = await hash(data.password, 5)//guarda la password hasheada o encriptada
    }                                                //Debe tener async-await por la libreria

    return store.upsert(TABLA, authData)
}

//obtener lista de usuariosRegistrados en Auth
const listAuth = async (req, res) =>{
    const lista = await store.list(TABLA)

    if(!lista){
        response.error(req, res, 'Ocurrió un error', 500)
    }else{
        response.success(req, res, lista, 200)
    }
}

//Login de usuario y generacion de sesion id o Token
const login = async (req, res) =>{
    if(req.body.username && req.body.password){
        const data = await store.query(TABLA, req.body.username)

        const sonIguales = await compare(req.body.password, data.password)
        if(sonIguales){
            //GENERAMOS TOKEN
            const cuerpo = {"message": "Login exitoso",
                            "token" : generateToken(data)}

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
    login,
    listAuth
}