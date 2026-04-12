import userModel from "../Models/userModel.js"
import sendEmail from "../services/sendEmail.js"
import jwt from "jsonwebtoken"


/**
 * @route POST api/auth/register
 * @body {email,username,password}
 */
export async function register(req,res){
    const{username,email,password}=req.body
    const isUserAlreadyExist = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
       
    })
     if(isUserAlreadyExist){
            return res.status(400).json({
                message:"user already exists with this email or username",
                success:false,
                err:"user already exists"
            })
        }

        const user = await userModel.create({
            email,
            username,
            password
        })

        const token = jwt.sign({
        email:user.email
     },
     process.env.JWT_SECRET,
     {expiresIn:"1d"}
    )

     

       await sendEmail({
        to:email,
        subject:"Welcome to Perplexity",
       
        html:  `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify your email address by clicking the link below:</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verify Email</a>
                <p>If you did not create an account, please ignore this email.</p>
                <p>Best regards,<br>The Perplexity Team</p>
        `
       })
    

     res.status(201).json({
        message:"user registered successfully",
        success:true,
        user
     })
      
}


export async function login(req,res){
    const{email,password} = req.body
    console.log("req body: ",req.body)
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
       return res.status(400).json({
            message:"invalid credentials",
            success:false,
            err:"invalid credentials"
        })
    }
    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid){
        return res.status(400).json({
            message:"invalid credentials",
            success:false,
            err:"invalid credentials"
        })
    }
    if(!user.verified){
       return res.status(400).json({
            message:"email not verified",
            success:false,
            err:"email not verified"
        })
    }
    const token = jwt.sign({
        email:user.email
     },process.env.JWT_SECRET,{expiresIn:"1d"})

     res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:24*60*60*1000
     })

     res.status(200).json({
        message:"user logged in successfully",
        success:true,
        user
        
     })
     
}
export async function getme(req,res){
        
       const user = await userModel.findById(req.user.id)

       if(!user){
         return res.status(404).json({
            message:"User not found",
            success:false,
            err:"user not found"
        })
       }
       res.status(200).json({
        message:"User dtails fetched successfully",
        success:ture,
        user
       })
     }
/**
 * @desc Verify user's email address
 * @route GET /api/auth/verify-email
 * @access Public
 * @query { token }
 */

export async function verifyEmail(req, res) {
    const { token } = req.query;

    try {


        const decoded = jwt.verify(token, process.env.JWT_SECRET);


        const user = await userModel.findOne({ email: decoded.email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid token",
                success: false,
                err: "User not found"
            })
        }

        user.verified = true;

        await user.save();

        const html =
            `
        <h1>Email Verified Successfully!</h1>
        <p>Your email has been verified. You can now log in to your account.</p>
        <a href="http://localhost:3000/login">Go to Login</a>
    `

        return res.send(html);
    } catch (err) {
        return res.status(400).json({
            message: "Invalid or expired token",
            success: false,
            err: err.message
        })
    }
}