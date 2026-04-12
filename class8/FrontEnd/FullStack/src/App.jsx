import React, { useState,useEffect } from 'react'
import axios from 'axios'
const App = () => {
    const [note, setnote] = useState([])
    const [editId, seteditId]=useState(null)
    const [editTitle, seteditTitle] = useState("")
    const [editdescription, seteditdescription] = useState("")
    function fetchnotes(){
      axios.get('http://localhost:3000/api/notes' )
    .then((res)=>{
        setnote(res.data.notes)
    })

    }
    useEffect(()=>{
        fetchnotes()
    },[])
  
    function handleSubmit(e){
        e.preventDefault()
        const{title,description} = e.target.elements 
        console.log(title.value,description.value)
        axios.post('http://localhost:3000/api/notes',{
            title:title.value,
            description:description.value
        })
        .then((res)=>{
            console.log(res.data)
            fetchnotes()
        })
    }
    function handledeletenote(noteID){
        axios.delete('http://localhost:3000/api/notes/'+noteID)
        .then((res)=>{
            console.log(res.data)
            fetchnotes()
        })
        .catch((err)=>{
            console.error('Delete error:', err)
        })
    }
    function handleEdit(note){
        seteditId(note._id)
        seteditTitle(note.title)
        seteditdescription(note.description)
       
        

    }
    function handleUpdate(noteID){
         axios.patch(`http://localhost:3000/api/notes/${noteID}`,{
            title:editTitle,
         description:editdescription
         })
         .then(()=>{
            seteditId(null)
            fetchnotes()
         })
         
    }
  return (
  <>
   <form className='create-form' onSubmit={handleSubmit}>
        <input name='title' type="text" placeholder='Enter the title'/>   
        <input  name='description' type="text" placeholder='Enter Description' />
        <button>Create Note</button>
    </form>
    <div className='notes'>
        {note.map((n) => (
            <div key={n._id} className='note'>
                
                {
                    editId===n._id?(<>
                      <input value={editTitle}
                      onChange={(e)=>seteditTitle(e.target.value)}/>

                    <input value={editdescription}
                    onChange={(e)=>seteditdescription(e.target.value)}/>
                    
                    <button onClick={()=>handleUpdate(n._id)}>save</button>
                    <button onClick={()=>seteditId(null)}>cancel</button>
                   </>):(<>
                          <h1>{n.title}</h1>
                <p>{n.description}</p>
                <button onClick={() => handledeletenote(n._id)}>Delete</button>
                <button onClick={()=>handleEdit(n)}>Edit</button>
                    </>)
                }
            </div>
        
    
        ))}
      
    </div>
    </>
  )
}

export default App
