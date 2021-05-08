const jwt = require('jsonwebtoken');
const config = require('../config')

const generateToken = (data) =>{
    return jwt.sign(data, config.JWT_SECRET)
}

module.exports = {
    generateToken
}