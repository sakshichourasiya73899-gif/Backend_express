import mongoose from "mongoose";
import { config } from "./config.js";
const connectDB = async () => {
   const mongoURI = config.MONGO_URI;
   if(!mongoURI){
    console.error("MONGO_URI is not defined in environment variables");
   }
   try{
    await mongoose.connect(mongoURI)
    console.log("Connected to MongoDB")
   } catch(error){
    console.error("Error connecting to MongoDB:",error.message);
     process.exit(1);       
    }
   }
export default connectDB;