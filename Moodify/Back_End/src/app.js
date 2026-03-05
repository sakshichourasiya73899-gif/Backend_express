let express = require("express")
let app =  express();
let cookieParser = require("cookie-parser")
let authRouter = require("./Routes/authRouter")
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)


module.exports = app