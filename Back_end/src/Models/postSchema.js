let mongoose = require("mongoose")
let postSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:""
    },
    Img_URL:{
      type:String,
      required:[true,"Image url is required for creating a post"]
    },
    user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"users",
       required:[true,"user Id is required for creating the post"]

    }
   
})
 let postModel = mongoose.model("posts",postSchema)
 module.exports = postModel
