import userModel from "../Models/user.model.js";
import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

const jwtsecret = config.JWT_SECRET;

async function sentTokenResponse(user,res){
    //confused about ._id or .id what should use here
    const token = jwt.sign({id:user._id},
    jwtsecret,{}
    )
}




export const register  = async (req,res)=>{
    const {email,name,contact,password,role} = req.body;
    try{
        //check if user already exists
        //go once revise all of the status codes and their meaning and also the error handling in express - watch videos on error handling in express and also on express validator to understand it in depth
        const exitingUser = await userModel.findOne({
            $or:[
                {email},
                {contact}
            ]
        })
        if(exitingUser){
            return res.status(400).json({message:"User with this email or contact already exists"})
        }
        //create new user
        const user = await userModel.create({
            email,
            contact,
            password,
            name,
            role

        })


    }
    catch(error){
        console.log(error);
        return res.status(500).json({message:"Server error"})
    }

}