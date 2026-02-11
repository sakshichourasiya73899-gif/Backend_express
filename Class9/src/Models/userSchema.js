let mongoose = require('mongoose')
let userSchema = new mongoose.Schema({
  Name : String,
  Email:{
    type : String,
    unique : [
        true , "user alrady exits with this Email"
    ]
  },
  Password:String,
})
let userModel = mongoose.model('register',userSchema)
module.exports = userModel

