let mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    username:{
       type:String,
       required:[true,"username is required"],
       unique:[true,"username already exists"]
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,'email already exists']

    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:{
        type:String
    },
    profilephotos:{
        type:String,
        default:"https://ik.imagekit.io/rozyqoxz7/userimage.avif"
    }
})
let userModel = mongoose.model("user",userSchema)
module.exports = userModel