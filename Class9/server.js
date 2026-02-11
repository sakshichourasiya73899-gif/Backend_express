const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");


const app = require('./src/app')

require('dotenv').config()
let ConnectToDB = require("./src/config/connect_to_DB")

ConnectToDB();

app.listen(3000,()=>{
    console.log("server is running on prot 3000")
});
