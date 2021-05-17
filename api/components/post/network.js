const express = require('express')

const {verifyToken} = require('../../middlewares/index')

const router = express.Router()

const {list, addNewPost, getPostByUser} = require('./controller')

router.get('/getPostList', verifyToken, list)
router.post('/addNewPost', verifyToken, addNewPost)
router.get('/getMyPosts', verifyToken, getPostByUser)



module.exports = router