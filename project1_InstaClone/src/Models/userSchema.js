let mongoose = require("mongoose")

let userSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:[true,"username already exists"],
        required:[true,"user is rquired"]
},
email:{
    type:String,
    unique:[true,"email already exists "],
    required:[true,"email is required"]
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
}

})

let userModel = mongoose.model("user",userSchema)
module.exports = userModel