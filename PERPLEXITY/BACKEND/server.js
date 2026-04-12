import dns from "dns"
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

import dotenv from "dotenv"

import app from "./src/app.js"

import ConnectToDB from "./src/config/database.js";
dotenv.config()

const PORT = process.env.PORT || 3000;

ConnectToDB()
    .catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });
    app.get("/", (req, res) => {
  res.send("Server is working");
});
app.listen(PORT,()=>{
    console.log(`server is running ${PORT}`)
})