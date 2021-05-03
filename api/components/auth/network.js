const express = require('express')
const router = express.Router()

const {login, listAuth} = require('./controller')

router.post('/login', login)
router.get('/getAuthList', listAuth)


module.exports = router