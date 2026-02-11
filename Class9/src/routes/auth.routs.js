const express = require('express')
const userModel = require("../Models/userSchema")

const jwt  = require("jsonwebtoken")

const authRouter = express.Router()

authRouter.post('/register',async(req,res)=>{
    const{Name,Email,Password} = req.body
    //this part is controller
    const isUserAlreadyExists = await userModel.findOne({Email})
    if(isUserAlreadyExists){
        return res.status(409).json({
            message : "user already exists with this email address"
        })
    }
    const user = await userModel.create({         //why this code was not proving the data on postman without asymc and await
        Name,Email,Password
    })

    let token = jwt.sign({
        id : user._id
    },
process.env.JWT_SECRET)


res.cookie("jwt_token",token)
    
    res.status(201).json({
        message:"user registered",
        user,
        token
    })
})

module.exports = authRouter