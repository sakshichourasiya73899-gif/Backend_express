let express = require("express")
let authcontroller= require("../controller/auth.controllers.js")

const authRouter = express.Router()

authRouter.post("/register",authcontroller.registerController)
authRouter.post("/login",authcontroller.loginController)

module.exports = authRouter