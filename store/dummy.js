const db = {
    'user' :[
        {
            id: 1,
            name: 'Carlos'
        }
    ]

}

const list =(tabla) =>{
    return db[tabla]
}

const get = (tabla, id) =>{
    const col= list(tabla)
    return col.filter(item => item.id == id)[0] || null
}

const upsert = (tabla, data) =>{
    db[tabla].push(data)
    return data
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
    remove
}