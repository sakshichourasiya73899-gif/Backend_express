import mongoose from "mongoose"

async function ConnectToDB(){
    await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to DB")
    })
}
export default ConnectToDB