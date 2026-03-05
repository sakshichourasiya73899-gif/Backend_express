let mongoose = require("mongoose")

async function ConnectToDB(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("DB connected")
    })
    .catch((err)=>{
        console.log("Error Occured",err)
    })
}

module.exports = ConnectToDB