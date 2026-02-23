let express = require("express")
let authRouter = require("./routes/authRouter")
let cookieParser = require("cookie-parser")
let app = express()
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)

module.exports = app
