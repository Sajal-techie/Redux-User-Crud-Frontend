import React, { useState } from "react";
import axios from "axios";                 
import { BaseUrl } from "../../Featues/UserApi";
import validator  from 'validator'
import Swal from 'sweetalert2';

const EditModal = ({ isOpen, onClose, userData,getUserList }) => {
    if (!isOpen || !userData) return null;
    const [formData,setFormData] = useState({ 
        username:userData.username,
        email:userData.email,
        number:userData.number,
        is_active:userData.is_active,
    })
    console.log(formData,'formdatatatatat');
    const onChange = (event)=>{
        console.log(event.target,'evnet');
        setFormData({
           ...formData,
            [event.target.name]:event.target.value
        })
    }
    const handleSubmit = async (event)=>{
        event.preventDefault();
        const {username,number} = formData
        console.log(username,number,'username number');
        if (!username.trim() ){
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Username is required!',
              })
              return
        }else if (number){
            if (!validator.isNumeric(number)){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Number should be numeric!',
                  })
                  return
            }else if (number.length!== 10){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Number should be 10 digits!',
                  })
                  return
            }
        }
        try{

          const request = await axios.put(`${BaseUrl}user_details/${userData.id}/`,formData);
          console.log(request.data);
          if (request.data.id){
            getUserList();
            onClose();
            Swal.fire({
              icon:'success',
              title: 'User Updated',
              showConfirmButton: false,
              timer: 1500
            })
          }else{
            Swal.fire({
              icon: 'error',
              title: 'update failed',
              text:'something went wrong',
            })
          }
          onClose();
        } catch (err){
          console.log(Object.values(err.response.data)[0]);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text:Object.values(err.response.data)[0],
          })
          onClose();
        }

      }
        return (
      <>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none bg-gray-800 bg-opacity-50">
            <div className="relative w-full max-w-md mx-auto my-6 bg-white rounded-lg shadow-lg outline-none focus:outline-none">
              <div className="relative flex flex-col w-full p-8">
                <h1 className="text-2xl font-bold mb-6 text-center">Update User </h1>
                <form className="w-full max-w-sm mx-auto" onChange={onChange} onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">username</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      type="text" id="name" name="username" placeholder="username" defaultValue={formData.username}   />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      type="email" id="email" name="email" placeholder="email" defaultValue={formData.email} readOnly/>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="number">Number</label>
                    <input className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                      type="number" id="number" name="number" placeholder="9999999999" defaultValue={formData.number}/>
                  </div>
                  <fieldset className="relative z-0 w-full p-px mb-5">
                    <legend className="absolute text-gray-500 transform scale-75 -top-3 origin-0">Activate/Block User</legend>
                    <div className="block pt-3 pb-2 space-x-4">
                    <label>
                        <input
                        type="radio"
                        name="is_active"
                        value={true}
                        defaultChecked={formData.is_active}
                        className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                        />
                        activate
                    </label>
                    <label>
                        <input
                        type="radio"
                        name="is_active"
                        value={false}
                        defaultChecked={!formData.is_active}
                        className="mr-2 text-black border-2 border-gray-300 focus:border-gray-300 focus:ring-black"
                        />
                         block
                    </label>
                    </div>
                    <span className="text-sm text-red-600 hidden" id="error">Option has to be selected</span>
                </fieldset>

                  <div className="flex justify-center">
                    <button
                      className="bg-indigo-500 text-white text-sm font-bold mx-4 py-3 px-4 rounded-md hover:bg-indigo-600 transition duration-300"
                      type="submit"
                    >
                      Update
                    </button>
                  <div type='button' className="bg-red-600 hover:bg-red-700 px-4 py-2 mx-3 rounded text-white mr-1 " onClick={onClose}>Cancel</div>
                  </div>
                </form>
                <button
                  className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={onClose}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
     

export default EditModal