const mongoose = require("mongoose")
let blacklistSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required"],
        unique:[true,"token should be unique"]
    }
},{
    timestamps:true
})
const blacklistModel = mongoose.model("blacklist",blacklistSchema)
module.exports = blacklistModel