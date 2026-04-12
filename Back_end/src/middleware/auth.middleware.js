let jwt = require("jsonwebtoken")

async function identifyUser(req,res,next){
   let token = req.cookies.jwt_token
   if(!token){
    return res.status(401).json({
        message:"token not found , unauthorised user"
    })
   }
   let decode = null
   try{
    decode = jwt.verify(token,process.env.JWT_SECRET)
   }
   catch(err){
    return res.status(401).json({
        message:"user not authorized"
    })
   }
   req.user = decode 
   next()
}
module.exports = identifyUser