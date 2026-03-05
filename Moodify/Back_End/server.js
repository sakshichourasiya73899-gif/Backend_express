const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");

require("dotenv").config()
let app = require("./src/app")
let ConnectToDB = require("./src/config/database")
ConnectToDB()


app.listen(3000,()=>{
    console.log("the server is running on port 3000")
})
