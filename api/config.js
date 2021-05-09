const {config} = require('dotenv')
config()
module.exports = {
    PORT: process.env.PORT || 3000,
    LOCALHOST: process.env.LOCALHOST || 'http://localhost',
    JWT_SECRET: process.env.JWT_SECRET || 'secret',
    MySQL:{
        host: process.env.MySQL_HOST || 'localhost',
        user: process.env.MySQL_USER || 'marie911',
        password: process.env.MySQL_PASSWORD || 'alex911',
        database: process.env.MySQL_DATABASE || 'mi-api-red-social',
    } 
}