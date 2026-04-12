let express = require("express")

let userModel = require("../Models/UserSchema")
let crypto = require("crypto")
let jwt = require("jsonwebtoken")
 let authRouter = express.Router() 
authRouter.post("/register",async(req,res)=>{
    let{username,email,password}= req.body
    let isuseralreadyexist = await userModel.findOne({email})
    if(isuseralreadyexist){
        return res.status(409).json({
            message:"User already exits"
        })
    }

    const hash = crypto.createHash("md5").update(password).digest("hex")
    let user = await userModel.create({
        username,email,hash
    })

    let token = jwt.sign({
        id:user._id,
        email:user.email
    },
process.env.JWT_SECRET
)
res.cookie("jwt_token",token)
    res.status(201).json({
        message:"user registered successfully",
        user,
        token
    })
})

authRouter.post("/login",async(req,res)=>{
    const{email,password}=req.body
    let user = await userModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
const isPasswordMatched = user.password === crypto.createHash("md5").update(password).digest("hex")
if(!isPasswordMatched){
    return res.status(402).json({
        message:"incorrect password"
    })
}
let token = jwt.sign({
    id :user._id,
    email:user.email
},process.env.JWT_SECRET)
req.cookie('jwt_cookie',token)
res.status(201).json({
    message:"user loggedin",
    user,
    
})

})
module.exports = authRouter