import React from 'react'
import { Route,Navigate } from 'react-router-dom'

const PrivateRoute = ({element,userType}) => {
  const token = localStorage.getItem( userType === 'admin' ? 'jwtTokenAdmin':'jwtTokenUser')
  const isAuthenticated = !!token
  console.log(token,isAuthenticated,userType);
  return isAuthenticated ?(
     element       )
      : <Navigate to={`/${userType === 'admin' ? 'admin_login':'login'}`} replace />  
  }
          

export default PrivateRoute
