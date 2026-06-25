const express = require('express')
const userController = require('./controllers/authController')


const router = new express.Router()

//register
router.post('/register',userController.addUserController)
//login
router.post('/login',userController.logincontroller)





module.exports = router