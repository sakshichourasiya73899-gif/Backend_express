let authcontroller = require("../Controllers/auth.Controller")

let express = require("express")

let authRouter = express.Router()
authRouter.post("/register",authcontroller.registerController)
authRouter.post("/login",authcontroller.loginController)


module.exports = authRouter