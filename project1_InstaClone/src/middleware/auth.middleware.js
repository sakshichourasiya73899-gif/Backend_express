let jwt = require("jsonwebtoken")
async function IdentifyUser(req,res,next){
    const token = req.cookies.Jwt_token
    if(!token){
        return res.status(401).json({
            message:"Token not found "
        })
    }
    let decode = null

  try{
    decode = jwt.verify(token,process.env.JWT_SECRET)
    
  }
  catch(err){
     return res.status(401).json({
        meassage:"user not authorized"
     })
  }
  req.user = decode
  next()

}
module.exports = IdentifyUser