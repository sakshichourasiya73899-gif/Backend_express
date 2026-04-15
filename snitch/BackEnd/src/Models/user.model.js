import mongoose from "mongoose"
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    contact:{
        // country:{type:String,required:true},
        // number:{type:String,required:true},
        type:String,
        required:true     //try using country code here
    },
    password:{
        type:String,
        required:true
    },
    fullname:{
         type:String,
         required:true
    },
    role:{
        type:String,
        enum:["buyer","seller"],
        required:true,
        default:"buyer"
    }
})
//learn more on these lines pre and post in mongoose and also on middlewares in mongoose - watch videos on this topic to understand it in depth
userSchema.pre("save",async function(){
  if(!this.isModified("password")) return;
  const hash = await bcrypt.hash(this.password,10);
  this.password = hash;
})
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password,this.password)
}
const userModel = mongoose.model("user",userSchema);
export default userModel;
//u gotta learn one more thing how data base talks to the server and how the server talks to the database and also how the server talks to the client and also how the client talks to the server - watch videos on this topic to understand it in depth