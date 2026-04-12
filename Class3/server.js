let express = require('express')
let app = express()
app.use(express.json())

let notes = []
app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
     res.send('note Created')
})
app.get('/notes',(req,res)=>{
    res.send(notes)
})
app.listen(3000,()=>{

})