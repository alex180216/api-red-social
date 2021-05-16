const {hash, compare} = require('bcrypt')

const store = require('../../../store/mysql')
const response = require('../../network/response')

const TABLA = 'user_follow'
const TABLA_USUARIOS = 'user'
const NAME_COLUMN = 'user_to'

//funcion para seguir a un usuario
const followTo = async(req, res ) =>{
    const follow = {
        user_from: req.user.id,
        user_to: req.params.id 
    }

    const usuarioEncontrado = await store.get(TABLA_USUARIOS, follow.user_to)

    const usuarioEn =  JSON.parse(JSON.stringify(usuarioEncontrado))
    console.log(usuarioEn.length)
    if(usuarioEn.length == 0){
        response.error(req, res, 'Ese usuario no existe', 500)
    }else{
        
        const addFollow = await store.follow(TABLA, follow)
        if(!addFollow){
            response.error(req, res, 'Hubo un error al cargar', 500)
        }
        
        response.success(req, res, `Estás siguiendo a ${follow.user_to}`, 201)
    }

}

//funcion para obtener seguidores por token de sesion
const getFollowers = async (req, res) =>{
    const listaFollowers = JSON.parse(JSON.stringify(await store.getRelationship(TABLA, req.user.id, NAME_COLUMN)))

    if(!listaFollowers){
        response.error(req, res, 'Hubo un error al consultar tus seguidores', 500)
    }

    if(listaFollowers.length == 0){
        response.success(req, res, `No tienes seguidores`, 200)
    }else{
        response.success(req, res, `Tienes ${listaFollowers.length} seguidores`, 200)
    }
}


module.exports = {
    followTo,
    getFollowers
}