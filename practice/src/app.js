let express = require("express")
let app = express()
let userModel = require("./Models/UserSchema")
let authRouter = require('./Router/auth.routes')
let cookieParser = require('cookie-parser')
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth',authRouter)


module.exports = app;