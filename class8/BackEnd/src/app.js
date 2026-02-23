
let NoteModel = require('./Models/NoteModel.js')
let express = require("express")
let app = express()
const cors = require("cors");
app.use(cors());


app.use(express.json())

app.post('/api/notes', async(req,res)=>{
    const{title,description,date}= req.body
    const note = await NoteModel.create({
        title,description,date

    })
    res.status(201).json({
        message:"Note Created Successfully",
        note
    })
})

app.get('/api/notes',async(req,res)=>{
    const notes = await NoteModel.find()
    res.status(200).json({
        message:"Message fetched successfully",
        notes
    })
})
app.delete('/api/notes/:id',async(req,res)=>{
    const id = req.params.id
    const note = await NoteModel.findOneAndDelete(id)
    res.status(200).json({
        message:"Note deleted successfully",
        note
    })
})
app.patch('/api/notes/:id',async(req,res)=>{
    const id = req.params.id
    const {title,description,date}=req.body
    const note = await NoteModel.findByIdAndUpdate(id,{title,description,date})
    res.status(200).json({
        message:"Note updated successfully",
        note
    })
})
module.exports = app
 
