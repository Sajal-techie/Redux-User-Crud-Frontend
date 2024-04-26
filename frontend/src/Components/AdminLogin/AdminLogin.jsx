import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userLogin } from '../../Featues/UserSlice'
import LoadingPage from '../../Pages/LoadingPage'
import validator  from 'validator'
import Swal from 'sweetalert2';

const AdminLogin = () => {
    const [formData,setFormData] = useState({
            email:'',
            password:'',
        })
    const [error,setError] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const loading = useSelector(state=>state.is_loading)
    
    const handleChange = (e)=>{
        formData[e.target.name] = e.target.value
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        console.log(formData);
        const {email, password} = formData
        if (!validator.isEmail(email)){
            setError('Invalid Email')
        }
        if (!password){
            setError('Enter Password')
        }

        const response = await dispatch(userLogin({
            type:'ADMIN_LOGIN',
            payload:formData
        }))
        console.log(response);
        if (response.payload.status === 400 || !response.payload ){
            console.log(response.payload,response.payload.message);
            Swal.fire({
                title: 'Login Failed',
                text: response.payload.message,
                showConfirmButton: true,
                background: 'white',
                padding: '20px',
                color:'red',
                icon: 'warning',
            });
            return
        }
        if (!response.payload.is_active ){
            console.log(response.payload);
            Swal.fire({
                title: 'Login Failed',
                text: 'you are blocked',
                showConfirmButton: true,
                background: 'white',
                padding: '20px',
                color:'red',
                icon: 'warning',
            });
            return
        }
        else{
            navigate('/admin_home')
        }

    }

    useEffect (()=>{
        const token = localStorage.getItem('jwtTokenAdmin');
        if (token){
          console.log('token is there redircting to home');
          navigate('/admin_home')
        }
      },[])
  return (
    loading ? <LoadingPage/>:
    <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
	<div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
		<h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome Back Admin!</h1>
		<form onChange={handleChange} onSubmit={handleSubmit}>
			<div className="mb-4">
				<label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
				<input defaultValue={formData.email} type="email" id="email" name='email' className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@email.com" required/>
			</div>
			<div className="mb-4">
				<label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
				<input defaultValue={formData.password} type="password" name='password' id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required/>
				{/* <a href="#"
					className="text-xs text-gray-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Forgot
					Password?</a> */}
			</div>
			{/* <div className="flex items-center justify-between mb-4">
				<div className="flex items-center">
					<input type="checkbox" id="remember" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 focus:outline-none" checked/>
					<label for="remember" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">Remember me</label>
				</div>
				<a href="#"
					className="text-xs text-indigo-500 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Create
					Account</a>
			</div> */}
             <h4 className='text-red-700 text-center'>{error}</h4> 
			<button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Login</button>
		</form>
	</div>
</div>
  )
}

export default AdminLogin
