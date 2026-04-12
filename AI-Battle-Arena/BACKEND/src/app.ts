import express from "express";
import cors from "cors";
import router from "./Routes/route.js"

let app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  credentials:true,
}))
app.use("/api",router);


export default app;


  

