const {config} = require('dotenv')
config()
module.exports = {
    PORT: process.env.PORT || 3000,
    LOCALHOST: process.env.LOCALHOST || 'http://localhost',
    JWT_SECRET: process.env.JWT_SECRET || 'secret'
}