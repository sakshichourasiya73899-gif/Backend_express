import React from 'react'
import axios from 'axios'
import { Link } from 'react-router'
import { useState } from 'react'

const Register = () => {
   const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")

    async function handleSubmit(e){
        e.preventDefault()
        axios.post("http://localhost:3000/api/auth/register",{
          username,
          email,
          password
        },{
          withCredentials:true
        })
        .then((res)=>{
          console.log(res.data)
        })
    }
  return (
    <div>
      <main>
        <div className='form-container'>
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input onInput={(e)=>{setusername(e.target.value)}}
             type="text" 
             placeholder='Enter Username' />
            <input onInput={(e)=>{setemail(e.target.value)}}
            type="email" 
            placeholder='Enter email' />
            <input onInput={(e)=>{setpassword(e.target.value)}}
            type="password" 
            placeholder='Enter Password' />
            <button>Register</button>
            <p>Already have an account? <Link className='toggleAuthForm' to="/login">Login</Link></p>

          </form>
        </div>
      </main>
    </div>
  )
}

export default Register
