const {config} = require('dotenv')
config()
module.exports = {
    PORT: process.env.PORT,
    LOCALHOST: process.env.LOCALHOST
}