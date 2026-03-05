const userModel = require("../Models/userModel")
const blacklistModel = require("../Models/blacklistModel")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

    async function registerController(req,res){

    const{username,email,password,bio,profileImage} = req.body
    console.log(req.body)

    const isUserAlreadyExists = await userModel.findOne({
           $or:[
            {username},
            {email}]
})
if(isUserAlreadyExists){
    return res.status(409).json({
        message:"User Alreasy Exists"
    })
}
const hash = bcrypt.hashSync(password,10)

const newUser =  await userModel.create({
   username,
   email,
   password:hash,
   bio,
   profileImage
})

const token = jwt.sign({
    id:newUser._id,
    username:newUser.username
},process.env.JWT_SECRET,{expiresIn:"1d"})

res.cookie("token",token)

res.status(201).json({
    messsage:"user registerred successfully",
    newUser
})

}
async function loginController(req,res){
    const{username,email,password} = req.body

   const isUserValid = await userModel.findOne({
    $or:[
        {username},
        {email}
        
    ]
   }).select("+password")
   if(!isUserValid){
    return res.status(400).json({
        message:"Invalid Cradentials",
    })
   }
   const isPasswordValid = bcrypt.compareSync(password,isUserValid.password)
   if(!isPasswordValid){
    return res.status(400).json({
        message:"Invalid Cradentials"
    })
   }
   const token = jwt.sign({
      id :isUserValid._id,
      username : isUserValid.username
   },process.env.JWT_SECRET,{expiresIn:"1d"})
   res.cookie("token",token)

res.status(201).json({
    message:"user loggedIn successfully",
    isUserValid
})
}

async function getMeController(req,res){
    console.log(req.user)
    const user = await userModel.findById(req.user.id)
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    res.status(200).json({
        message:"user fecthed successfully",
        user
    })
}

async function logoutController(req,res){
   
    const token = req.cookies.token
    res.clearCookie("token")

    const blacklist = await blacklistModel.create({
        token
    })
 res.status(201).json({
    message:"user logged out successfully",
    blacklist
 })

}

module.exports = {
    registerController,
    loginController,
    getMeController,
    logoutController
}


