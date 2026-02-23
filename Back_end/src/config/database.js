let mongoose = require("mongoose")

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
    console.log("DB connected is to server")
    })
}
module.exports = ConnectToDB
