const express = require('express')

const {verifyToken} = require('../../middlewares/index')

const router = express.Router()

const {followTo, getFollowers, whoIFollow} = require('./controller')

router.post('/followTo/:id', verifyToken, followTo)
router.get('/getFollowers', verifyToken, getFollowers)
router.get('/getWhoIFollow', verifyToken, whoIFollow)


module.exports = router