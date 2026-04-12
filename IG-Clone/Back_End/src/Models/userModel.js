let mongoose = require("mongoose")

let userSchema =  new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"user name already exists"],
        required:[true,"username is required"]
    },
    email:{
        type:String,
        unique:[true,"email already exists"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"Password is rquired"],
        select:false
    },
    bio:String,
    profileImage:{
        type:String,
        default:"https://ik.imagekit.io/rozyqoxz7/userimage.avif?updatedAt=1770819912220"
    }
    
   
})
 userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password
        delete ret.__v   // optional (removes version key)
        return ret
    }
})
let userModel =  mongoose.model("user",userSchema)

module.exports = userModel