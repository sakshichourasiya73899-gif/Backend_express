import express from "express"
import CookieParser from "cookie-parser"
import authrouter from "./Routes/authRouter.js"
import chatsRouter from "./Routes/chatsRouter.js"
import cors from "cors"
import morgan from "morgan"
const app = express()

app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", // your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(CookieParser())
app.use(morgan("dev"))
app.use("/api/auth",authrouter)
app.use("/api/chats",chatsRouter)


export default app