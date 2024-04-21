import { jwtDecode } from 'jwt-decode';
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const user = useSelector((state)=>state.user)

  console.log(user);

  return (
    <div>
      <button  >logout </button> <br />
      {user ? <>Welcome to home </> : <>login to view home page</>}
      
    </div>
  )
}

export default Home
