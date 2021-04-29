const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const controller = require('./controller')


router.get('/', (req, res)=>{
    response.success(req, res, 'Todo Ok con User', 200)
    response.error(req, res, 'Ocurrió un error', 500)
})

module.exports = router