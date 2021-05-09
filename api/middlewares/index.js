//desde aqui se importaran el verificador y el autorizador

const verifyToken = require('./authJWT')
const verifyPassword = require('./verifySignup')

module.exports = {
    verifyToken,
    verifyPassword
}