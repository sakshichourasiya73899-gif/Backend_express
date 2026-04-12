let mongoose = require('mongoose')

function ConnectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is Connected to DB")
    })
}
module.exports = ConnectToDB
