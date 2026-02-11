const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");




let app = require('./src/app')
require('dotenv').config()

let ConnectToDB = require('./src/config/database')
app.listen(3000,(req,res)=>{
    console.log("Server is running on port 3000")
})

ConnectToDB()