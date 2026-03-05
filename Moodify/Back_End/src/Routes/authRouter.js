
const express = require("express")
const userController = require("../controllers/userController")
const authRouter = express.Router()
const authMiddleware = require("../middleware/authMiddleware")

authRouter.post("/register",userController.registerController)
authRouter.post('/login',userController.loginController)
authRouter.get('/getme',authMiddleware.identifyUser,userController.getMeController)
authRouter.post('/logout',userController.logoutController)

module.exports = authRouter