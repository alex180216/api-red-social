const db = {
    'user' :[
        {
            id: 1,
            name: 'Carlos'
        }
    ],
}

const list =(tabla) =>{
    return db[tabla]
}

const get = (tabla, id) =>{
    const col= list(tabla)
    return col.filter(item => item.id == id)[0] || null
}

const upsert = (tabla, data) =>{
    if(!db[tabla]){
        db[tabla] = []
    }
    db[tabla].push(data)
    return data
}

const query = (tabla, q) =>{
    if(!db[tabla]){
        return null
    }
    const index = db[tabla].findIndex(item => item.username == q)
    if(index>=0){
        const elementoUbicado = db[tabla][index]
        return elementoUbicado
    }else{
        return null
    }
    
}

const remove = (tabla, id) =>{
    const index = db[tabla].findIndex(item => item.id == id)
    if(index >=0){
        const elementoEliminado = db[tabla].splice(index, 1)
        return true
    }
    
    
}

module.exports = {
    list,
    get,
    upsert,
    remove,
    query
}