import axios from 'axios'
import React, { useState } from 'react'
import { BaseUrl } from '../../Featues/UserApi'
import { useNavigate } from 'react-router-dom'
import validator  from 'validator'
import Swal from 'sweetalert2';

const Add_User = () => {
    const [formData,setFormData] = useState({
        username:'',
        email:'',
        number:'',
        password:'',
    })
    const [errors,setErrors] = useState({})
    const navigate = useNavigate()
    const handleChange = (e)=>{
            formData[e.target.name] = e.target.value
    }
    console.log(formData,'formdata in add');
    const handlesubmit= (e)=>{
        e.preventDefault();
        const {username, email,password} = formData
        console.log(formData);
        const errors ={}
        if (!username){
          errors.username = 'username is required'
        }
        if (!validator.isEmail(email)){
          errors.email = 'Invalid email address'
        }
        if (!validator.isLength(password,{min:6})){
          errors.password = 'password must be 6 characters'
        }
        if (Object.keys(errors).length > 0){
          setErrors(errors)
          return
        }
        console.log(errors);
        axios.post(`${BaseUrl}signup/`,formData).then(
            (res)=>{
                console.log(res.payload)
                Swal.fire({
                    icon:'success',
                    title: 'User added successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                navigate('/admin_home')
            }
        ).catch((err)=>{
            console.log(err,'erore in add user signup')
            console.log(Object.values(err.response.data)[0]);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text:Object.values(err.response.data)[0],
            })
        })
    }
  return (
    <>
        <div className="bg-gray-100">
        <div className="container mx-auto py-8">
            <h1 className="text-2xl font-bold mb-6 text-center">Registration Form</h1>
            <form className="w-full max-w-sm mx-auto bg-white p-8 rounded-md shadow-md" 
                onChange={handleChange} onSubmit={handlesubmit} >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="text" id="username" name="username" placeholder="username" defaultValue={formData.username} />
            {errors.username && <div className='text-center text-red-500'>{errors.username} </div>}           
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="email" id="email" name="email" placeholder="eaxpme@gmail.com" defaultValue={formData.email} />
            {errors.email && <div className='text-center text-red-500'>{errors.email} </div>}           
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">Mobile Number</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="number" id="number" name="number" placeholder="9999999999" defaultValue={formData.number} />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Password</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="password" id="password" name="password" placeholder="********" defaultValue={formData.password} />
            {errors.password && <div className='text-center text-red-500'>{errors.password} </div>}           
            
            </div>
            <button
                className="w-full bg-indigo-500 text-white text-sm font-bold py-2 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                type="submit">Add User</button>
            </form>
        </div>
        </div>
    </>
  )
}

export default Add_User
