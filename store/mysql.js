const mysql = require('mysql')

const config = require('../api/config')


const dbconf = {
    host: config.MySQL.host,
    user: config.MySQL.user,
    password: config.MySQL.password,
    database: config.MySQL.database
}

const connection = mysql.createConnection(dbconf)

connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
   
    console.log('connected as id ' + connection.threadId);
});

//obtener la lista de una tabla
const list = (table) =>{
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM ${table}`, (err, results) =>{
            if(err) return reject(err)
            resolve(results)
        })
    })
}

//obtener un objeto de la tabla desde su id
const get = (table, id) =>{
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM ${table} WHERE id = '${id}'`, (err, results) =>{
            if(err) return reject(err)
            resolve(results)
        })
    })
}

//Agregar uno nuevo
const upsert = (table, data) =>{
    return new Promise((resolve, reject) =>{
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, results) =>{
            if(err) return reject(err)
            resolve(results)
        })
    })
}

/**
 * para updatear
 * const update = (table, data) =>{
    return new Promise((resolve, reject) =>{
        connection.query(`UPDATE ${table} SET ? WHERE id=?`,[data, data.id], (err, results) =>{
            if(err) return reject(err)
            resolve(results)
        })
    })
}
 * 
 * aqui lo que se esta diciendo en la sentencia SQL es: actualiza en la tabla 
 * la 'data' donde id = 'data.id'
 */


//funcion de login
const query = (table, query) =>{
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM ${table} WHERE username=? `, query, (err, results) =>{
            if(err) return reject(err)
            //console.log(JSON.parse(JSON.stringify(results[0])))
            resolve(results[0])
        })
    })
}



module.exports = {
    list,
    get,
    upsert,
    query
}