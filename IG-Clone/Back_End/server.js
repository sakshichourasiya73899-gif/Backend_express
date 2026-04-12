const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config()
let ConnectToDB = require("./src/config/database")
ConnectToDB()


let app = require('./src/app')

app.listen(3000,()=>{
    console.log("Server is running on port 3000")
})