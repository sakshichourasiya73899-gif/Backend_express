let server = require('express')
let app = server()
app.get('/',(req,res)=>{
    res.send('Hello from Express')
})
app.get('/about',(req,res)=>{
    res.send('About Us Page')
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})