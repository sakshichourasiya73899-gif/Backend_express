let mongoose = require('mongoose')

let NoteSchema = new mongoose.Schema({
    title:String,
    description:String,
    date: Date
}, { timestamps: true })

let NoteModel = mongoose.model("Notes",NoteSchema)

module.exports=NoteModel
