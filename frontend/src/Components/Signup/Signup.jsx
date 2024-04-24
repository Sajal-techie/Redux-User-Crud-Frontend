import React, { useState } from 'react'
import axios from 'axios'
import { BaseUrl } from '../../Featues/UserApi'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')
  const [formData,setFormData] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !password || !email){
      console.log('error aan mwone ');
    }
    else{
      axios.post(`${BaseUrl}signup/`,{
        username:name,
        password,
        email,

      }) 
     .then(res => {
      console.log(res.data)
      navigate('/login')
      })
     .catch(err => {
      console.log(err)
  
    })
    
  }
}
  return (
    <div className='mt-11'>
    <form onSubmit={handleSubmit}>
      username :  
      <input className='bg-blue-400' type='text' value={name} onChange={(e)=>setName(e.target.value)} /> <br />
      email :  
      <input className='bg-blue-400 ms-2 mt-2' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} /> <br />
      password : 
      <input className='bg-blue-400 ms-2 mt-2' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
      <button className='bg-yellow-600'>submit</button>
    </form>
  </div>
  )
}

export default Signup
