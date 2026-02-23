let express = require('express')

let app = express()
let notes = []
app.use(express.json())
app.get('/',(req,res)=>{
    res.send(notes)
})

app.post('/notes',(req,res)=>{
    console.log(req.body)
    notes.push(req.body)
    console.log(notes)
    res.send('note Created')
})

app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index]
    res.send('note deleted')
    console.log(notes)
})
app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description = req.body.description
    res.send('note updated')
    console.log(notes)
})

module.exports = app