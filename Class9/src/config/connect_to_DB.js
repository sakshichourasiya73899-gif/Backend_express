let mongoose = require("mongoose")

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI)

    .then(()=>{
        console.log("Databse Connected")
    })
}
module.exports = ConnectToDB