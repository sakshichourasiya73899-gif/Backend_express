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
        unique:[true,"email can't be same"]

    },
    password:{
        type:String,
        required:[true,"Password is required"],
        select:false

    },
  })
   userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password
        delete ret.__v   // optional (removes version key)
        return ret
    }
})


let userModel = mongoose.model("user",userSchema)
module.exports = userModel