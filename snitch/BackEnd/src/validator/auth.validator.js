import {body,validationResult} from "express-validator";

function validateRequest(req,res,next){
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});

    }
    next();
}




export const validateRegisterUser=[
    body("email")
    .isEmail().withMessage("Invalid email format"),
    body("contact")
    .notEmpty().withMessage("Contact is required")
    .matches(/^\+\d{1,3}\d{9}$/).withMessage("Contact must be in the format +<country code><number>"),
    body("password")
    .isLength({min:6}).withMessage("Password must be at least 6 characters long"),

   validateRequest
]

//analyse how it's really working n other ways of error handling - watch videos on error handling and exprsss validator learn it indepth
//what is length isEmail not empty are function or object