import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BaseUrl } from '../../Featues/UserApi'
import defaultProfile from '../../assets/profile.webp'
import { Link } from 'react-router-dom'
import EditModal from './EditModal'
import DeleteModal from './DeleteModal'


const AdminHome = ({userList,getUserList}) => {
    const [selectedUser,setSelecteduser] = useState(null)
    const [editmodal,setEditModal] = useState(false)
    const [deleteModal,setDeleteModal] = useState(false)
    const openEditModal = (user)=>{
        setSelecteduser(user)
        setEditModal(true)
    }
    const closeEditModal = ()=>{
        setEditModal(false)
    }
    const openDeleteModal = (user) => {
        setSelecteduser(user)
        setDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setDeleteModal(false);
    };
    // useEffect(()=>{
    //     getUserList();
    // },[]) 

    console.log(userList,'userlist logged');
  return (
    <>
   <> <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md m-5">
  <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
    <thead className="bg-gray-50">
      <tr>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">User_ID</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Usename</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Active</th>
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">number</th>
        {/* <th scope="col" className="px-6 py-4 font-medium text-gray-900">Team</th> */}
        <th scope="col" className="px-6 py-4 font-medium text-gray-900">Actions</th>
      </tr>
    </thead>

    <tbody className="divide-y divide-gray-100 border-t border-gray-100">
    {userList.length > 0 ?   
    <>
    {userList.map((user)=>{
        return(

      <tr className="hover:bg-gray-50" key={user.id}>
        <td className="px-6 py-4">{user.id}</td>
        <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
          <div className="relative h-10 w-10">
            <img
              className="h-full w-full rounded-full object-cover object-center"
              src={user.user_profile ? user.user_profile: defaultProfile }
              alt="profile"
              />
            <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
          </div>
          <div className="text-sm">
            <div className="font-medium text-gray-700">{user.username}</div>
            <div className="text-gray-400">{user.email}</div>
          </div>
        </th>
        <td className="px-6 py-4">
          <span
            className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600"
            >
            <span className={`h-1.5 w-1.5 rounded-full ${user.is_active ? 'bg-green-600' : 'bg-red-600'}`}></span>
              {user.is_active ? <span>active</span> : <span>blocked</span>  }  
          </span>
        </td>
        <td className="px-6 py-4">{user.number ? user.number : <span>null</span> }</td>

        <td className="px-6 py-4 ">
          <div className="flex justify-end gap-4 ">
            <Link x-data="{ tooltip: 'Delete' }" onClick={()=> openDeleteModal(user)} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                x-tooltip="tooltip"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                />
              </svg>
            </Link>
            <Link x-data="{ tooltip: 'Edite' }" onClick={()=>openEditModal(user)} >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
                x-tooltip="tooltip"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                  />
              </svg>
            </Link>
          </div>
        </td>
      </tr>
       )
      })} </>: <tr className='h-16'> <td className='text-center   text-lg text-black' colSpan={5}>  No User Available</td></tr>}
    </tbody>
  </table>
</div>
<EditModal isOpen={editmodal} onClose={closeEditModal} userData={selectedUser} getUserList={getUserList}/>
<DeleteModal isOpen={deleteModal} onClose={closeDeleteModal}  userData={selectedUser}  getUserList={getUserList} />
</>  
</>
)
}


export default AdminHome
