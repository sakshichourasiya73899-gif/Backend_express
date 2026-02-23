let mongoose = require("mongoose")
let followSchema = new mongoose.Schema({
    follower:{
        type:String
    },
    followee:{
        type:String
    }

},
{timestamps:true})

let followModel = mongoose.model("follow",followSchema)
module.exports = followModel