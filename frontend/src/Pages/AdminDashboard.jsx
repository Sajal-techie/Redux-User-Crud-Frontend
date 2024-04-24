import React, { useEffect, useState } from 'react'
import AdminNavbar from '../Components/AdminHome/AdminNavbar'
import AdminHome from '../Components/AdminHome/AdminHome'
import axios from 'axios'
import { BaseUrl } from '../Featues/UserApi'

const AdminDashboard = () => {
  const [userList,setUserList] = useState([])
  const [filteredUserList, setFilteredUserList] = useState([]);

  const updateUserList = (userData)=>{
    setFilteredUserList(userData)
  }
  useEffect(()=>{
      getUserList();
  },[]) 

  const getUserList = async  ()=>{
    const request = await axios.get(`${BaseUrl}user_list/`);
    setUserList(request.data);
    setFilteredUserList(request.data)
    
  }

  return (
    <div>
        <AdminNavbar  userList={userList} filterList={filteredUserList} setUserList={updateUserList} getUserList={getUserList}   />
        <AdminHome userList={filteredUserList} setUserList={updateUserList} getUserList={getUserList} />
       
    </div>
  )
}

export default AdminDashboard