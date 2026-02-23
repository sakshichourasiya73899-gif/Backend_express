let userModel = require("../Models/userSchema")
let crypto  = require("crypto")
let jwt = require("jsonwebtoken")

async function registerController(req,res){
    const{username,email,password,bio,profilephoto}= req.body
    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserAlreadyExist){
        return res.status(409).json({
            message:"User already exist"+ (isUserAlreadyExist.email==email?"  Email already exist":"Username already exist")
        })
    }
    const hash = crypto.createHash("sha256").update(password).digest("hex")
    let user = await userModel.create({
         username,
         email,
         bio,
         profilephoto,
         password:hash

    })
    const token = jwt.sign({
        id:user._id,
        email:user.email
    },process.env.JWT_SECRET,{
        expiresIn:"1d"
    })

    res.cookie("jwt_token",token)

    res.status(201).json({
        message:"User Registered",
        username:user.username,
        email:user.email,
        bio:user.bio,
        profilephoto:user.profilephoto

    })

   }
    async function loginController(req,res){
        const{username,email,password}= req.body
         console.log("username:", username)
          console.log("email:", email)


        const user = await userModel.findOne({
            $or:[
                {
                    username:username
                },
                {
                    email:email
                }
            ]
        })
       
        if(!user){
            return res.status(404).json({
                message:"User not found",

            })

        }
        const hash = crypto.createHash("sha256").update(password).digest("hex")
        const isPasswordValid = hash === user.password
        if(!isPasswordValid){
            return res.status(401).json({
                message:"Invalid Password"
            })
        }
        let token = jwt.sign(
            {id:user._id},
            process.env.JWT_SECRET,{expiresIn:"1d"}
        )
        res.cookie("jwt_token",token)

        res.status(200).json({
            message:"user logged in successfully",
            user:{
                username:user.username,
                email:user.email,
                bio:user.bio,
                profilephoto:user.profilephoto
            }
        })
        
    }
    module.exports={
            registerController,
            loginController
        }