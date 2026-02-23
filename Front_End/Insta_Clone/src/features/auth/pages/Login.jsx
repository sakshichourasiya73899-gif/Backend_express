import React from 'react'
import '../../Styles/form.scss'
import axios from 'axios'
import { Link } from 'react-router'
import { useState } from 'react'
const Login = () => {
  const [username, setusername_email] = useState("")
  const [password, setpassword] = useState("")
  async function handleSubmit(e){
    e.preventDefault()
    axios.post("http://localhost:3000/api/auth/login",{
      username,
      password
    },{ withCredentials:true })
    .then((res)=>{
      console.log(res.data)
    })
  }
  return (
    <main>
       <div className='form-container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
         <input onInput={(e)=>{setusername_email(e.target.value)}}
         type="text" 
         placeholder='Enter Username' />
        <input onInput={(e)=>{setpassword(e.target.value)}}
        type="password" 
        placeholder='Enter Password' />
          <button>Login</button>
            <p>Don't have an account? <Link className='toggleAuthForm' to="/register">Register</Link></p>
      </form>
    </div>
    </main>
   
  )
}

export default Login
