import React, { useEffect, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { userLogin } from '../../Featues/UserSlice'
import { Link, useNavigate } from 'react-router-dom'
import LoadingPage from '../../Pages/LoadingPage'
import validator  from 'validator'
import Swal from 'sweetalert2';

const Login = () => {
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState({})

  const dispatch = useDispatch()
  const loading = useSelector(state=>state.is_loading)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validator.isEmail(email)){
      setError({email:'Please enter a valid email'})
      return
    }
    if (!password){
      setError({password:'Please enter a password'})
      return
    }


    try{
      const decodedToken =  await dispatch(userLogin({
        type:'USER_LOGIN',
        payload:  {email,password}
      }));
      console.log(decodedToken);
      if (decodedToken.payload.status ===400 || !decodedToken.payload){
        Swal.fire({
          title: 'Login Failed',
          text: decodedToken.payload.message,
          showConfirmButton: true,
          background: 'white',
          padding: '20px',
          color:'red',
          icon: 'warning',
      });
        return
      }
      if (!decodedToken.payload.is_admin & decodedToken.payload.is_active ){
        navigate('/')
      }
      else if (decodedToken.payload.is_admin){
        Swal.fire({
          title: 'Login Failed',
          text: 'Only users are allowed to Login' ,
          showConfirmButton: true,
          background: 'white',
          padding: '20px',
          color:'red',
          icon: 'warning',
      });
      }
      else if (!decodedToken.payload.is_active){
        Swal.fire({
          title: 'Login Failed',
          text: "Can't Login because you are BLOCKED",
          showConfirmButton: true,
          background: 'white',
          padding: '20px',
          color:'red',
          icon: 'warning',
      });
      }
    }catch(err){ 
      console.log(err,'loginpage error in login')
      throw err
    }
  }
  useEffect (()=>{
    const token = localStorage.getItem('jwtTokenUser');
    if (token){
      console.log('token is there redircting to home');
      navigate('/')
    }
  },[])
  return (

    loading ? <LoadingPage/> :
    <div className="min-h-screen bg-no-repeat bg-cover bg-center"
style={{backgroundImage:  "url('https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80')"}}>
<div className="flex justify-end">
  <div className="bg-white min-h-screen w-1/2 flex justify-center items-center">
    <div>

      <form  onSubmit={handleSubmit}>
        <div>
          <span className="text-sm text-gray-900">Welcome back</span>
          <h1 className="text-2xl font-bold">Login to your account</h1>
        </div>
          <div className="my-3">
            <label className="block text-md mb-2" htmlFor="email">Email</label>
            <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="email" name="email" placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
        {error.email && <div className='text-center text-red-500'> {error.email} </div> }
      </div>
        <div className="mt-5">
          <label className="block text-md mb-2" htmlFor="password">Password</label>
          <input className="px-4 w-full border-2 py-2 rounded-md text-sm outline-none" type="password" name="password" placeholder="password"  value={password} onChange={(e)=>setPassword(e.target.value)} />
          {error.password && <div className='text-center text-red-500'> {error.password} </div> }
      </div>
            {/* <div className="flex justify-between">
              <div>
                <input className="cursor-pointer"  type="radio" name="rememberme"/>
                <span className="text-sm">Remember Me</span>
              </div>
              <span className="text-sm text-blue-700 hover:underline cursor-pointer">Forgot password?</span>
            </div> */}
            <div className="">
              <button className="mt-4 mb-3 w-full bg-green-500 hover:bg-green-400 text-white py-2 rounded-md transition duration-100">Login now</button>
              {/* <div className="flex  space-x-2 justify-center items-end bg-gray-700 hover:bg-gray-600 text-white py-2 rounded-md transition duration-100">

          <img className=" h-5 cursor-pointer" src="https://i.imgur.com/arC60SB.png" alt=""/>
                <button >Or sign-in with google</button>
              </div> */}
            </div>
      </form>
      <p className="mt-8"> Dont have an account? <Link className="cursor-pointer text-sm text-blue-600" to={'/signup'} > Join now</Link></p>
    </div>
  </div>
</div>
</div>
  )
}

export default Login
