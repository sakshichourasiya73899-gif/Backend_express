import dns from 'dns';
dns.setServers(["8.8.8.8", "8.8.4.4"]);
dns.setDefaultResultOrder("ipv4first");


import app from './src/app.js';
import connectDB from './src/config/db.js';

connectDB()

app.listen(process.env.PORT||5000,()=>{
    console.log("Server is running on port 3000")
})