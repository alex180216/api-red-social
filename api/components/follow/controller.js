const {hash, compare} = require('bcrypt')

const store = require('../../../store/mysql')
const response = require('../../network/response')


const TABLA = 'user_follow'
const TABLA_USUARIOS = 'user'
const NAME_COLUMN = 'user_to'
const NAME_COLUMN_ORIGIN = 'id'
const NAME_COLUMN_FROM = 'user_from'

//funcion para seguir a un usuario
const followTo = async(req, res ) =>{
    const follow = {
        user_from: req.user.id,
        user_to: req.params.id 
    }

    const usuarioEncontrado = await store.get(TABLA_USUARIOS, follow.user_to)

    const usuarioEn =  JSON.parse(JSON.stringify(usuarioEncontrado))
    //console.log(usuarioEn.length)
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
        //SELECT * FROM user U JOIN user_follow UF ON U.id = 'sanre' AND UF.user_to = '4QSWOZCL3H2YvC11Ts9gg'
        //SELECT * FROM ${tableOrigin} A JOIN ${tableCondition} B ON A.${name_columnOrigin} = '${queryCondition}' AND B.${name_columnCondition} = '${queryOrigin}
        const listaMisSeguidores = []
        

        for (let i=0; i< listaFollowers.length; i++){
            let join = `A JOIN ${TABLA} B ON A.${NAME_COLUMN_ORIGIN} = '${listaFollowers[i].user_from}' AND B.${NAME_COLUMN} = '${req.user.id}'`
            const datosFollower = JSON.parse(JSON.stringify(await store.getObjectListJOIN(TABLA_USUARIOS, join)))
            listaMisSeguidores.push(datosFollower)
        }

        const responseFollowers = {
            numberFollowers: listaFollowers.length,
            followersInfo: listaMisSeguidores
        }
        response.success(req, res, responseFollowers, 200)
    }
}


//funcion para obtener lista de a quienes sigo
const whoIFollow = async (req, res) =>{
    const listaMisSeguidos = JSON.parse(JSON.stringify(await store.getRelationship(TABLA, req.user.id, NAME_COLUMN_FROM)))

    if(!listaMisSeguidos){
        response.error(req, res, 'Hubo un error al consultar a quien sigues', 500)
    }

    if(listaMisSeguidos.length == 0){
        response.success(req, res, `No sigues a nadie todavía`, 200)
    }else{
        //SELECT * FROM user A JOIN user_follow B ON A.id = B.user_to AND B.user_from = '4QSWOZCL3H2YvC11Ts9gg' AND B.user_to = 'id.user_to'
        const infoListMisSeguidos = []
        
        for (let i=0; i< listaMisSeguidos.length; i++){
            let join = `A JOIN ${TABLA} B ON A.${NAME_COLUMN_ORIGIN} =  B.${NAME_COLUMN} AND B.${NAME_COLUMN_FROM} = '${req.user.id}' AND B.${NAME_COLUMN} = '${listaMisSeguidos[i].user_to}'`
            const datosFollower = JSON.parse(JSON.stringify(await store.getObjectListJOIN(TABLA_USUARIOS, join)))
            infoListMisSeguidos.push(datosFollower)
        }

        const responseSeguidos = {
            numberFollowers: listaMisSeguidos.length,
            followersInfo: infoListMisSeguidos
        }
        response.success(req, res, responseSeguidos, 200)
    }
}


module.exports = {
    followTo,
    getFollowers,
    whoIFollow
}