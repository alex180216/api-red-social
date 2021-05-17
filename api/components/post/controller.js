const {hash, compare} = require('bcrypt')
const {nanoid} = require('nanoid')
const store = require('../../../store/mysql')
const response = require('../../network/response')


const TABLA = 'post'
const NAME_COLUMN = 'user'

//funcion para obtener lista de posts totales
const list = async (req, res) =>{
    
    const lista = await store.list(TABLA)
    
    if(!lista){
        response.error(req, res, 'Ocurrió un error', 500)
    }else{
        response.success(req, res, lista, 200)
    }
}


//añadir nuevo post
const addNewPost = async (req, res) =>{
    if(!req.body.text){
        response.error(req, res, 'Necesitamos al menos un texto para publicar', 500)
    }

    const newPost = {
        id: (!req.body.id) ? nanoid() : req.body.id,
        text: req.body.text,
        user: req.user.id
    }

    const postGuardado =  JSON.parse(JSON.stringify( await store.upsert(TABLA, newPost)))

    if(postGuardado.affectedRows > 0){
        response.success(req, res, 'Post publicado con exito', 200)
    }else{
        response.error(req, res, 'Ocurrió un error', 500)
    }

    
}

//obtener posts por token de sesion (es decir por usuario)
const getPostByUser = async (req, res) =>{
    const listaPosts = JSON.parse(JSON.stringify(await store.getRelationship(TABLA, req.user.id, NAME_COLUMN)))

    if(!listaPosts){
        response.error(req, res, 'Hubo un error al consultar tus Posts', 500)
    }

    if(listaPosts.length == 0){
        response.success(req, res, `No has posteado nada aun`, 200)
    }

    response.success(req, res, listaPosts, 200)
}




module.exports = {
    list,
    addNewPost,
    getPostByUser
}