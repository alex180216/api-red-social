var jwt = require('jsonwebtoken');

const generateToken = (data) =>{
    return jwt.sign(data, 'secreto')
}

module.exports = {
    generateToken
}