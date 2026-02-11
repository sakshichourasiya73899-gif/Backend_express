let mongoose = require('mongoose')

let userSchema = new mongoose.Schema({
    username:String,
    email:{
        type:String,
        unique:[true,"email already exists"]
    },
    password:String,
})
let userModel = mongoose.model("user",userSchema)
module.exports=userModel;