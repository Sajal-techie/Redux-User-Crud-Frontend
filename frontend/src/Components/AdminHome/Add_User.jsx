import axios from 'axios'
import React, { useState } from 'react'
import { BaseUrl } from '../../Featues/UserApi'
import { useNavigate } from 'react-router-dom'

const Add_User = () => {
    const [formData,setFormData] = useState({
        username:'',
        email:'',
        number:'',
        password:'',
    })
    const navigate = useNavigate()
    const handleChange = (e)=>{
            formData[e.target.name] = e.target.value
    }
    console.log(formData,'formdata in add');
    const handlesubmit= (e)=>{
        e.preventDefault();
        console.log(formData);
        axios.post(`${BaseUrl}signup/`,formData).then(
            (res)=>{
                console.log(res.data)
                navigate('/admin_home')
            }
        ).catch((err)=>{
            console.log(err,'erore in add user signup')
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
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                type="email" id="email" name="email" placeholder="eaxpme@gmail.com" defaultValue={formData.email} />
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
