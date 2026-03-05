let jwt = require("jsonwebtoken")

async function identifyUser(req,res,next){
      console.log(req.cookies)
    let token = req.cookies.token
  
    if(!token){
        return res.status(401).json({
            message:"Token not found "
        }
        )
    }
  let decoded = null
  try{
    decoded= jwt.verify(token,process.env.JWT_SECRET)
  }
  catch(err){
    return res.status(401).json({
        message:"unauthorized user"
    })
  }
  console.log(decoded)
  req.user = decoded
  console.log(req.user)
  next()
}
module.exports = {identifyUser}
