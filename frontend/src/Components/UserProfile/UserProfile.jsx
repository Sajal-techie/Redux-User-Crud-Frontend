import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../Featues/UserApi';
import { useNavigate } from 'react-router-dom';
import defaultProfile from '../../assets/profile.webp'
const UserProfile = () => {
    const token =  localStorage.getItem('jwtTokenUser')
    const navigate = useNavigate()
    const [userID,setUserID] = useState() //for storing current user id 
    // const [number,setNumber] = useState()
    // const [email,setEmail] = useState()
    const [pic,setPic] = useState() //for showing images while updating dynamically
    
    const [formData,setFormData] = useState({
        username:'',
        number:'',
        email:'',
        user_profile:''
    })
    console.log(formData, 'formdata',userID);
    const handleChange = (e) => {
        console.log(e.target);
        let { name, value,files } = e.target;
        if (name === 'user_profile'){
            console.log(files[0]);
            setFormData((prevFormData)=>({
                ...prevFormData,
                [name]: files[0]
            }))
            value = e.target.files[0]
            console.log(value);
            setPic(URL.createObjectURL(value))
            console.log(pic)
        }else{
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value
            }));
        }
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        const sentData = new FormData()
        for (let key in formData){
            console.log(key,formData[key]);
            if (key === 'user_profile')
            {
                console.log('out',key,formData[key]);
                if (pic !== formData.user_profile ){
                console.log('insodesfds',key,formData[key]);
                sentData.append(key,formData[key],'key kedata')
            }}
            else{
                if (formData[key]){
                    console.log('appendded',key,formData[key]);
                    sentData.append(key,formData[key])
                }
            }
        }
        sentData.forEach((h)=>console.log(h,'senddata'))
        console.log(formData,'insde sumbit',sentData);
        axios.put(`${BaseUrl}user_details/${userID}/`,sentData).then(
            (res) =>{
                console.log(res.data);
                setFormData({
                    username:res.data.username,
                    number:res.data.number,
                    email:res.data.email,
                    user_profile:res.data.user_profile
                })
                console.log(formData);
            }
        ).catch((err)=>{
            console.log(err,'erreeor in log');
        })
    }

    useEffect(()=>{
        console.log('useeffect');
        if (token){
                const authHeader = {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
                console.log(authHeader,'autheheader');
                const decodedToken = jwtDecode(token)
                const user_id = decodedToken.user_id
                axios.get(`${BaseUrl}user_details/${user_id}/`).then((res)=>{
                    console.log(res.data);
                    setUserID(res.data.id)
                    setPic(res.data.user_profile)
                    setFormData({
                        username:res.data.username,
                        number:res.data.number,
                        email:res.data.email,
                        user_profile:res.data.user_profile
                    })
                })
                
            }else{
                console.log('login to see profile');
                navigate('/login')
            }
    },[token])
    let image = pic ? {backgroundImage:`url(${pic})`}: {backgroundImage:`url(${defaultProfile})`}
    console.log(pic,'pclast');
  return (
    <section className="py-10 my-auto dark:bg-gray-900">
    <div className="lg:w-[80%] md:w-[90%] xs:w-[96%] mx-auto flex gap-4">
        <div
            className="lg:w-[88%] md:w-[80%] sm:w-[88%] xs:w-full mx-auto shadow-2xl p-4 rounded-xl h-fit self-center dark:bg-gray-800/40">
            <div className="">
                <h1
                    className="lg:text-3xl md:text-2xl sm:text-xl xs:text-xl font-serif font-extrabold mb-2 dark:text-white text-center">
                    User details
                </h1>
                {/* <h2 className="text-grey text-sm mb-4 dark:text-gray-400">Create Profile</h2> */}
                <form onChange={handleChange} onSubmit={handleSubmit} encType='multipart/form-data'>
                    {/* <!-- Cover Image --> */}
                    <div
                        className="w-full rounded-sm  bg-cover bg-center bg-no-repeat items-center">
                        {/* <!-- Profile Image --> */}
                        <div  style={image}
                            className="mx-auto flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat">
                            <div className="bg-white/90 rounded-full w-6 h-6 text-center ml-28 mt-4">

                                <input type="file" name="user_profile" id="upload_profile" hidden defaultValue={formData.user_profile}   />

                                <label htmlFor="upload_profile">
                                        <svg data-slot="icon" className="w-6 h-5 text-blue-700 cursor-pointer" fill="none"
                                            strokeWidth="1.5" stroke="currentColor" viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                            </path>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                            </path>
                                        </svg>
                                    </label>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            {/* <!--  --> */}
                            {/* <input type="file" name="profile" id="upload_cover" hidden required /> */}

                            <div
                                className="bg-white flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                                {/* <label htmlFor="upload_cover" className="inline-flex items-center gap-1 cursor-pointer">Cover
                                    
                                <svg data-slot="icon" className="w-6 h-5 text-blue-700" fill="none"W="1.5"
                                    stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                                    aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z">
                                    </path>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z">
                                    </path>
                                </svg>
                                </label> */}
                            </div>

                        </div>
                    </div>
                    <h2 className="text-center mt-1 font-semibold dark:text-gray-300">Profile 
                    </h2>
                    <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full  mb-4 mt-6">
                            <label htmlFor="" className="mb-2 dark:text-gray-300">Username</label>
                            <input type="text" name='username'
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="username" defaultValue={formData.username} />
                        </div>
                        <div className="w-full  mb-4 lg:mt-6">
                            <label htmlFor="" className=" dark:text-gray-300">Email</label>
                            <input type="text" name='email'
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="example123@gmail.com"  defaultValue={formData.email} />
                        </div>
                        <div className="w-full  mb-4 lg:mt-6">
                            <label htmlFor="" className=" dark:text-gray-300">Mobile number</label>
                            <input type="text" name='number'
                                    className="mt-2 p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800"
                                    placeholder="9876543210" defaultValue={formData.number} />
                        </div>
                    </div>

                    {/* <div className="flex lg:flex-row md:flex-col sm:flex-col xs:flex-col gap-2 justify-center w-full">
                        <div className="w-full">
                            <h3 className="dark:text-gray-300 mb-2">Sex</h3>
                            <select
                                    className="w-full text-grey border-2 rounded-lg p-4 pl-2 pr-2 dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800">
                                    <option disabled value="">Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                        </div>
                        <div className="w-full">
                            <h3 className="dark:text-gray-300 mb-2">Date Of Birth</h3>
                            <input type="date"
                                    className="text-grey p-4 w-full border-2 rounded-lg dark:text-gray-200 dark:border-gray-600 dark:bg-gray-800" />
                        </div>
                    </div> */}
                    <div className="w-full rounded-lg bg-blue-500 mt-4 text-white text-lg font-semibold">
                        <button type="submit" className="w-full p-4">Submit</button>
                    </div>
                </form>                      
            </div>
        </div>
    </div>
</section>
  )
}

export default UserProfile
