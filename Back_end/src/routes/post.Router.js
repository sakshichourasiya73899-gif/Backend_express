let express = require("express")
let postController= require("../Controllers/post.Controller")
let postRouter = express.Router()
let multer = require("multer")
let identifyUser = require("../middleware/auth.middleware")
const upload = multer({ storage: multer.memoryStorage() })

postRouter.post("/",upload.single("Image"),identifyUser,postController.CreatePostController)

module.exports = postRouter

