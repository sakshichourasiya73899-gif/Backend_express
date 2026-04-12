import {Router} from "express"
import{register} from "../Controllers/authController.js"
import{login} from "../Controllers/authController.js"
import{getme } from "../Controllers/authController.js"
import {authUser} from "../Middleware/authMiddleware.js"
import {registerValidator,loginValidator} from "../Validator/expressValidator.js"
import { verifyEmail} from "../Controllers/authController.js"

const authrouter = Router();
/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 * @body { username, email, password }
 */
authrouter.post("/register",registerValidator,register)
/**
 * @route POST /api/auth/login
 * @desc login user
 * @access Public
 * @body { username, email}
 
 */
authrouter.post("/login",loginValidator,login)
/**
 * @route POST /api/auth/getme
 * @desc get user details
 * @access Private
 * @body { token}
 */
authrouter.get("/get-me",authUser,getme)
/**
 * @route POST /api/auth/verifyEmail
 * @desc verify user's email address
 * @access Public
 * @body { token}
 */
authrouter.get("/verify-Email",verifyEmail)

 
 
export default authrouter