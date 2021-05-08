const {nanoid} = require('nanoid')

const store = require('../../../store/dummy')
const response = require('../../network/response')
const {newAuth} = require('../auth/controller')



const TABLA ='user'


//obtener lista de usuarios
const list = async (req, res) =>{
    
    const lista = await store.list(TABLA)

    if(!lista){
        response.error(req, res, 'Ocurrió un error', 500)
    }else{
        response.success(req, res, lista, 200)
    }
}

//obtener usuario por ID
const getUserById  = async (req, res) =>{
    const usuarioEncontrado = await store.get(TABLA, req.params.id)
    if(!usuarioEncontrado){
        response.error(req, res, 'No se encontró usuario con ese Id', 200)
    }else{
        response.success(req, res, usuarioEncontrado, 200)
    }
}

//añadir un usuario
const addNewUser = async (req, res) =>{
    if(!req.body.name || !req.body.username ){
        response.error(req, res, 'Hey! necesitas un nombre y un userName', 500)
    }else{
        const newUser = {
            name: req.body.name,
            username: req.body.username, //Esto lo agregamos con el auth
        }
        //evaluamos si envia un id
        if(req.body.id){
            newUser.id = req.body.id
        }else{
            newUser.id = nanoid()
        }



        if(req.body.password || req.body.username){
            const userAuthSaved = await newAuth({
                id: newUser.id,
                username: req.body.username,
                password: req.body.password
            })
        }
        
        const userSaved = await store.upsert(TABLA, newUser)
        
        
        if(!userSaved){
            response.error(req, res, 'Ups, ocurrió un error, no se pudo añadir el usuario', 500)
        }else{
            response.success(req, res, 'Usuario añadido con exito', 200)
        }
        
    }
    
}

//eliminar un usuario
const deleteUserById = async (req, res) =>{
    const usuarioEncontrado = await store.get(TABLA, req.params.id)
    if(!usuarioEncontrado){
        response.error(req, res, 'No se ha encontrado Usuario con ese ID', 404)
    }else{
        const usuarioEliminado = await store.remove(TABLA, req.params.id)
        if(!usuarioEliminado){
            response.error(req, res, 'Ups, ocurrió un error, No se pudo eliminar al usuario', 500)
        }else{
            response.success(req, res, 'Usuario eliminado exitosamente', 200)
        }
    }
       
}

module.exports ={
    list,
    getUserById,
    addNewUser,
    deleteUserById
}