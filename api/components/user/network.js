const express = require('express')
const router = express.Router()
const response = require('../../network/response')
const {list, getUserById, addNewUser, deleteUserById,
     followTo} = require('./controller')
const {verifyToken} = require('../../middlewares/index')


router.get('/', (req, res)=>{
    response.success(req, res, 'Todo Ok con User', 200)
})

router.get('/getUserList', verifyToken,  list)
router.get('/getUserById/:id', getUserById)
router.post('/addNewUser', addNewUser)
router.delete('/deleteUserById/:idUserToFollow', deleteUserById)



module.exports = router