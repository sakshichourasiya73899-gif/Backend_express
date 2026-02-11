const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");


let app = require("./src/app")
let ConnectToDB = require("./src/config/databse")

app.listen(3000,()=>{
    console.log("Server is running")
})

ConnectToDB()