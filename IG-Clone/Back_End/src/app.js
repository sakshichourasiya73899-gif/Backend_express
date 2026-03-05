let express = require("express")
let cookieParser = require('cookie-parser')

let app = express()
app.use(express.json())
app.use(cookieParser())

const authRouter = require("./routes/authRoutes")
app.use("/api/auth",authRouter)

module.exports = app