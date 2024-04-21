import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { userLogin } from '../../Featues/UserSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username,setName] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState('')
  const dispatch = useDispatch()
  const u = useSelector(state=>state.users)
  const navigate = useNavigate()
  // console.log(u,'login');
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!username || !password){
      setError('Please fill all the fields')
      return
    }

    try{
      const decodedToken =  await dispatch(userLogin({username,password}));
      console.log(decodedToken);
      if (decodedToken.error || !decodedToken.payload){
        setError('Invalid username or password')
        return
      }
      if (!decodedToken.payload.is_admin & decodedToken.payload.is_active ){
        navigate('/')
      }
      else if (decodedToken.payload.is_admin){
        // navigate('/admin') we can navigate from here itself
        setError('only users are allowed to login')
      }
      else if (!decodedToken.payload.is_active){
        setError('you are blocked ')
      }
    }catch(err){ 
      console.log(err,'loginpage error in login')
      throw err
    }
  }
  return (
    <div className='mt-11'>
      <form onSubmit={handleSubmit}>
         username :  
        <input className='bg-blue-400' type='text' value={username} onChange={(e)=>setName(e.target.value)} /> <br />
        password : 
        <input className='bg-blue-400 ms-2 mt-2' type='password' value={password} onChange={(e)=>setPassword(e.target.value)} /> <br />
        <button className='bg-yellow-600'>submit</button> <br />
        {error}
      </form>
    </div>
  )
}

export default Login
