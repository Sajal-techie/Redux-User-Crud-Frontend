import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { userRegistration } from '../../Featues/UserSlice'
import LoadingPage from '../../Pages/LoadingPage'
import validator from 'validator'
import Swal from 'sweetalert2';

const Signup = () => {
const [name,setName] = useState('')
  const [password,setPassword] = useState('')
  const [confirmpassword,setConfirmPassword] = useState('')
  const [email,setEmail] = useState('')
  const [errors,setErrors] = useState({})
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loading = useSelector(state=> state.is_loading)
  console.log(loading ,'in singup');
  const handleSubmit = (e) => {
    e.preventDefault()
    const errors ={}
    if (!name){
      errors.name = 'username is required'
    }
    if (!validator.isEmail(email)){
      errors.email = 'Invalid email address'
    }
    if (!validator.isLength(password,{min:6})){
      errors.password = 'password must be 6 characters'
    }
    if (password!== confirmpassword){
      errors.confirmpassword = 'Passwords do not match'
    }
    if (Object.keys(errors).length > 0){
      setErrors(errors)
      return
    }
    else{
      dispatch(userRegistration({ 
        username:name,
        password,
        email
      }))
     .then(res => {
      console.log(res.payload)
      if (res.payload.id){
        console.log('registration succesful');
        Swal.fire({
          title: 'Registration Successfull',
          text: 'You can now Login',
          showConfirmButton: true,
          background: 'white',
          padding: '20px',
          color:'green',
          icon: 'success',
      });
        navigate('/login')
      }else{
        console.log('registration unsuccesful');
        setErrors(res.payload[0])
        Swal.fire({
          title: 'Registration Failed',
          text: res.payload[0],
          showConfirmButton: true,
          background: 'white',
          padding: '20px',
          color:'red',
          icon: 'warning',
      });
      }
      })
     .catch(err => {
      console.log(err,'eror signup')
      Swal.fire(err)

  
    })
    
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

    <div className="bg-gray-100 flex items-center justify-center mt-6">
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Create a new account</h2>
        <form  onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-gray-700 text-sm font-semibold mb-2">Full Name </label>
                <input type="text" name='username' id="username" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="username"
                 value={name} onChange={(e)=>setName(e.target.value)} />
            {errors.name && <div className='text-center text-red-500'>{errors.name} </div>}
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">Email Address </label>
                <input type="email" id="email" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="hello@gmail.com"
                 value={email} onChange={(e)=>setEmail(e.target.value)} />
            {errors.email && <div className='text-center text-red-500'>{errors.email} </div>}
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">Password </label>
                <input type="password" id="password" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••"
                 value={password} onChange={(e)=>setPassword(e.target.value)} />
                <p className="text-gray-600 text-xs mt-1">Must contain 1 uppercase letter, 1 number, min. 8 characters.</p>
            {errors.password && <div className='text-center text-red-500'>{errors.password} </div>}
            </div>
            <div className="mb-6">
                <label htmlFor="confirmpassword" className="block text-gray-700 text-sm font-semibold mb-2">Confirm Password </label>
                <input type="password" id="confirmpassword" className="form-input w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500" required placeholder="••••••••"
                 value={confirmpassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
                {/* <p className="text-gray-600 text-xs mt-1">Must contain 1 uppercase letter, 1 number, min. 8 characters.</p> */}
            {errors.confirmpassword && <div className='text-center text-red-500'>{errors.confirmpassword} </div>}
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">Register</button>
            <p className="text-gray-600 text-xs text-center mt-4">
                Already have an account? <Link to={'/login'} className="text-blue-500 hover:underline">Login</Link> 
            </p>
        </form>
    </div>
</div>
  )
}

export default Signup
