let mongoose = require("mongoose")

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server has started ")
    })
    
}
module.exports = ConnectToDB