const express = require('express')
const router = express.Router()
const { Register, Login, GetDataUsers, UpdateDataUser, DeleteUsers } = require('../Controllers/UserController')
const { AuthMiddleWare } = require('../Middlewares/authMiddleware')
const { DataValidation } = require('../Middlewares/DataValidation')

router.post('/register',DataValidation,Register) 
router.post('/login',DataValidation,Login)
router.get('/',AuthMiddleWare,GetDataUsers)
router.put('/:id',AuthMiddleWare,UpdateDataUser)
router.delete('/:id',AuthMiddleWare,DeleteUsers)

module.exports = router

