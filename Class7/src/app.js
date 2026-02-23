let express = require("express")
let NoteModel=require("./Models/NoteModel.js")
let app =  express()

app.use(express.json())
app.post("/notes",async(req,res)=>{
    const{title,description}=req.body
    const note = await NoteModel.create({
        title,description
    })
    res.status(201).json({
        message:"Note Created Successfully",
        note
    })
})

module.exports = app