let mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:[true,"username already exists"]

    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email alrady exists"]

    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:{
        type:Stirng,
        required:[true,"bio is required"]
    },
    profilePhoto:{
        type:String,
        default:"https://ik.imagekit.io/rozyqoxz7/userimage.avif?updatedAt=1770819912220"
    }
})
const userModel = mongoose.model("user",userSchema)
module.exports = userModel