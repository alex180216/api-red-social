const express = require('express')

const {verifyPassword} = require('../../middlewares/index')

const router = express.Router()

const {followTo, getFollowers} = require('./controller')

router.post('/followTo/:id', verifyToken, followTo)
router.get('/getFollowers', verifyToken, getFollowers)


module.exports = router