let app = require("./src/app")
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");
let mongoose = require("mongoose")

function ConnectDb(){
    mongoose.connect("mongodb+srv://sakshi:qvIXZlgRx7iaJbmK@cluster0.oquhwsh.mongodb.net/")
    .then(()=>{
        console.log("DataBase Connected")
    })
}
ConnectDb()
    


app.listen(3000,()=>{
    console.log("Server Created")
    
})
