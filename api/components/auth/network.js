const express = require('express')

const {verifyPassword} = require('../../middlewares/index')

const router = express.Router()

const {login, listAuth} = require('./controller')

router.post('/login', login)
router.get('/getAuthList', listAuth)


module.exports = router