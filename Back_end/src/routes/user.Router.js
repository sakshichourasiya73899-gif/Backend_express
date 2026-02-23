let express = require("express")
let followRouter = express.Router()
let identifyUser = require("../middleware/auth.middleware")
let followController = require("../Controllers/user.Controller")


followRouter.post("/follow/:username",identifyUser,followController.followUserController)
followRouter.post("/unfollow/:username",identifyUser,followController.unfollowUserController)
followRouter.post("/accept/:username",identifyUser,followController.acceptRequestController)
module.exports = followRouter