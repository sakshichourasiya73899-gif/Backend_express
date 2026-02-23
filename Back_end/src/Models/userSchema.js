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
    unique:[true,"email already exists"]
},
password:{
    type:String,
    required:[true,"password is required"]
},
bio:{
    type:String
},
profilephoto:{
    type:String,
    default:"https://ik.imagekit.io/rozyqoxz7/userimage.avif?updatedAt=1770819912220"
},
status:{
    type:String,
    default:"pending",
    enum:{values:["pending","accepted","rejected"],
        message: "status can only be pending accepted or rejected"
    }
}

})
let userModel = mongoose.model("users",userSchema)
module.exports=userModel