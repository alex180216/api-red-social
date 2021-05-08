//la usaremos para verificar que el usuario este enviando su token
//autorizador

//creamos una funcion que se encargue de verificar si se esta enviando un token
const { verify } = require('jsonwebtoken')

const response = require('../network/response')
const config = require('../config')

module.exports = verifyToken = async(req, res, next) =>{
    //el headers es un objeto
    const token = req.headers['x-access-token'] // aqui le estoy diciendo, en tu propiedad
                                //'x-access-token', traeme el valor.

    
    if(!token){
        response.error(req, res, {message: 'No se recibe ningun token'}, 403)
    }else{
        const decoded = verify(token, config.JWT_SECRET)
        console.log(decoded)
        if(decoded.id !== req.body.id){
            response.error(req, res, {message: 'No puedes hacer esto'}, 500)
        }
    }
    
    next()//para que continue con la siguiente funcion en routes
}
