const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");


let app = require("./src/app")
let ConnectToDB = require("./src/config/database")
require("dotenv").config()

ConnectToDB();
app.listen(3000,(req,res)=>{
    console.log("server is running on port 3000")
})