const express = require('express')
const userController = require('./controllers/authController')
const menuController = require('./controllers/menuController')
const jwtMiddleware = require('./middleware/jwtMiddleware')
const multerMiddleware = require('./middleware/multerMiddleware')


const router = new express.Router()

//register
router.post('/register',userController.addUserController)
//login
router.post('/login',userController.logincontroller)

//add menu item - admin
router.post('/add-menu',jwtMiddleware,multerMiddleware.single('menuPic'),menuController.addMenuItem)
//get all menu item
router.get('/all-menu',menuController.getAllMenuItemsController)
//get single menu item
router.get('/menu/:id'.menuController.getSingleMenuItemController)
//edit menu item-admin
router.put('/menu/:id/edit',jwtMiddleware,multerMiddleware.single('menuPic'),menuController.editMenuController)
//delete menu item -admin
router.delete('/menu/:id/delete',jwtMiddleware,menuController.deleteMenuController)






module.exports = router