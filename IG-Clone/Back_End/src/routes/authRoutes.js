let express = require("express")
let authRouter = express.Router()
let authController = require("../controllers/authController")

authRouter.post("/register",authController.registerController)
authRouter.post("/login",authController.loginController)

module.exports = authRouter