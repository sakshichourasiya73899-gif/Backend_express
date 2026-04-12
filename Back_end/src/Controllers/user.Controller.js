let followSchema = require("../Models/followSchema")
let userSchema = require("../Models/userSchema")


async function followUserController(req,res){
    const followerusername = req.user.username
    const followeeusername= req.params.username
     
    if(followerusername===followeeusername){
        return res.status(400).json({
            message:"you can't follow yourself"
        })
        
    }
    const isfolloweeExists = await userSchema.findOne({
        username:followeeusername
    })
    if(!isfolloweeExists){
        return res.status(404).json({
            message:"user u are trying to follow doesn't exist"
        })
    }
    const isAlreadyfollowing = await followSchema.findOne({
        follower:followerusername,
        followee:followeeusername
    })
    if(isAlreadyfollowing){
        return res.status(409).json({
            message:"you are already following this user "
        })
    }
    const followRecord = await followSchema.create({  // why was follow:{} empty in postman while I was not using await here ??/
        follower:followerusername,
        followee:followeeusername
    })
    res.status(201).json({
        message:`u are following ${followeeusername}`,
        follow:followRecord     
    })

}
async function unfollowUserController(req,res){
    const followerusername=req.user.username
  const  followeeusername=req.params.username

  let isUserfollowing = await followSchema.findOne({
    follower:followerusername,
    followee:followeeusername
})
if(!isUserfollowing){
    return res.status(200).json({
        message:`you are not following ${followeeusername}`
    })
}
await followSchema.findOneAndDelete(isUserfollowing._id)
   res.status(200).json({
    messgae:`you have unfollowed ${followeeusername}`
   })


}
 async function acceptRequestController(req,res){  //alternative way of writing the same code and compare them
    const followeeusername = req.user.username
    const followerusername = req.params.username

    let isUserRequested = await followSchema.findOne({
        follower:followeeusername,
        followee:followerusername
    })
    if(!isUserRequested){
        return res.status(403).json({
            message:"user has not requested"
        })
    }
    await followSchema.findByIdAndUpdate(isUserRequested._id,
        {status:"accepted"},
        {new:true}
    )
 }

module.exports = {
    followUserController,
    unfollowUserController,
    acceptRequestController
}