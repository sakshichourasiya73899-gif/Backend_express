let express = require('express');
let app = express();

app.use(express.json());

let notes = []
app.post('/notes',(req,res)=>{
     console.log('note created');
     notes.push(req.body);
     res.status(201).json({message:"note Ceated Sussessfully"});


})
app.get('/notes',(req,res)=>{
    
    res.status(200).json({
        notes:notes
    })
})
//delete notes
app.delete('/notes/:index',(req,res)=>{
    delete notes[req.params.index];
    res.status(204).json({message:"note deleted sucessfully"});
})
//Patch notes
app.patch('/notes/:index',(req,res)=>{
    notes[req.params.index].description= req.body.description;
    res.status(200).json({
        "message":"note updated sucessfully",
        note:notes[req.params.index]
    })
})
//post notes
app.put('/notes/:index',(req,res)=>{
    notes[req.params.index]= req.body;
    res.status(200).json({
        "message":"note replaced sucessfully",
        note:notes[req.params.index]
    })
})
module.exports=app;
