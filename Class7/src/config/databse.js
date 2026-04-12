

let mongoose = require("mongoose")

function ConnectToDB(){
    mongoose.connect("mongodb+srv://sakshichourasiya73899_db_user:owEwRUxd4yISSXJZ@cluster0.8v0p3yc.mongodb.net/")
    .then(()=>{
        console.log("Database Connectd")
    })
}

module.exports = ConnectToDB

