let userModel = require("../Models/userModel")
let jwt = require("jsonwebtoken")
let bcrypt = require("bcrypt")

async function registerController(req,res){
    const{username,email,password,bio,profileImage} = req.body
    const isUserAlreadyExists = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExists){
        return res.status(409).json({
            message:"user already exists"+(isUserAlreadyExists.email===email?"Email Already Exists":"Username Already Exists")
        })
    }

    const hash = await bcrypt.hash(password,10)
    const user = await userModel.create({
        username,
        email,
        password:hash,
        bio,
        profileImage
    })
    const token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.Jwt_SECRET,{expiresIn:"1d"})
res.cookie("token",token)

res.status(201).json({
    message:"user registered successfully",
    user
})
}
async function loginController(req,res){
    const{username,email,password}=req.body

    let user = await userModel.findOne({
        $or:[
            {username:username},
            {email:email}

        ]
    }).select("+password")
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
    const isPasswordValid = await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid Password"
        })
    }
    let token = jwt.sign({
        id:user._id,
        username:user.username
    },process.env.JWT_SECRET,{expiresIn:"1d"})
    res.cookie("token",token)

    res.status(201).json({
          message:"User loggedIn successfully",
          user
    })
    }


module.exports={
    registerController,
    loginController
}