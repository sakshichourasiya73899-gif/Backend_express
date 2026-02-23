let userModel = require("../Models/userSchema")
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken")


async function registerController(req,res){
    const{username,email,password,bio,profilephoto}=req.body
    const isUserAlreadyExists  = await userModel.findOne({
        $or:[
         {username},
         {email}
        ]
        
    })
    if(isUserAlreadyExists){
        res.status(409).json({
            message:"User Already Exists"
        })
    }
    const hash = bcrypt.hashSync(password,10)

    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profilephoto
    })
    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,
    {expiresIn:"1d"})
    res.cookie("Jwt_token",token)

    res.status(201).json({
        message:"User Registered Successfully",
       username:user.username,
       email:user.email,
        bio:user.bio,
        profilephoto:user.profilephoto

    })



}
async function loginController(req,res){
    const{username,email,password} = req.body
    let user = await userModel.findOne({
        $or:[
            {username:username},
            {
                email:email
            }
        ]
    }) 
    if(!user){
        res.status(400).json({
            message:"user not found"
        })
    }

    const isPasswordValid = bcrypt.compareSync(password,user.password)
    if(!isPasswordValid){
        res.status(401).json({
            message:"Invalid Password"
        })
    }
    const token = jwt.sign({
      id:user._id,
      username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    
    res.cookie("jwt_token",token)
    res.status(200).json({
        message:"user logged in",
        user:{
            username:user.username,
            email:user.email,
            bio:user.bio,
            profilephoto:user.profilephoto
        }
    })
}
module.exports = {
    registerController,
    loginController
}