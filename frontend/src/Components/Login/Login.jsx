import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { loginUser } from '../../Featues/UserSlice'

const Login = () => {
  const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [formData,setFormData] = useState('')
  const dispatch = useDispatch()
  const u = useSelector(state=>state.users)
  console.log(u,'login');
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(loginUser({name,password}))
  }
  return (
    <div className='mt-11'>
      <form onSubmit={handleSubmit}>
         username :  
        <input className='bg-blue-400' type='text' value={name} onChange={(e)=>setName(e.target.value)} /> <br />
        password : 
        <input className='bg-blue-400 ms-2 mt-2' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
        <button className='bg-yellow-600'>submit</button>
      </form>
    </div>
  )
}

export default Login
