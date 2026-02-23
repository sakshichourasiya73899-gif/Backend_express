let mongoose = require("mongoose")
 function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connectd To DB")
    })
}
module.exports = connectToDB