import React from 'react'
import { BaseUrl } from '../../Featues/UserApi';
import axios from 'axios';
import Swal from 'sweetalert2';
const DeleteModal = ({ isOpen, onClose ,userData ,getUserList }) => {

   const handleDelete = (id)=>{
    console.log(id,'id of deletnguser');
    axios.delete(`${BaseUrl}user_details/${id}/`).then(
        (res) => {
            console.log(res.data);
            getUserList();
            onClose()
            Swal.fire({
                icon:'success',
                title: 'User Deleted',
                showConfirmButton: false,
                timer: 1500
              })
            
        }
    ).catch((err)=>{console.log(err,'error while deleting');onClose()})
}
  return (
    <>
        {isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg">
                    <p>Are you sure you want to delete {userData.username} ?</p>
                    <div className="flex justify-end mt-4">
                        <button
                            onClick={()=>handleDelete(userData.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md mr-4"
                        >
                            Yes, Delete
                        </button>
                        <button
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        )}
    </>
  )
}

export default DeleteModal
