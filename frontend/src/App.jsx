
import './App.css'
import { Link,Route,Routes } from 'react-router-dom'
import Signup from './Components/Signup/Signup'
import LoginPage from './Pages/LoginPage'
import Navbar from './Components/Navbar/Navbar'
import SignupPage from './Pages/SignupPage'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
import AdminHome from './Components/AdminHome/AdminHome'
import AdminDashboard from './Pages/AdminDashboard'
import Add_User from './Components/AdminHome/Add_User'
import AdminLogin from './Components/AdminLogin/AdminLogin'
import PrivateRoute from './Routes/PrivateRoute'
import ErrorPage from './Pages/ErrorPage'
function App() {
 

  return (
    
      <Routes>
        <Route path='/login'element={<LoginPage />}  /> 
        <Route path='/signup' element={<SignupPage />}  /> 
        <Route path='/' element={<PrivateRoute element={<HomePage />} userType='user' />} />
        <Route  path='/profile' element={<PrivateRoute element={<ProfilePage />} userType='user'/> } />
        <Route  path='/admin_login' element={<AdminLogin />}  />
        <Route  path='/admin_home' element={<PrivateRoute element={<AdminDashboard />} userType='admin'/> }  />
        <Route  path='/add_user' element={<PrivateRoute element={<Add_User />} userType='admin'/> }  />
        <Route path='*' element={<ErrorPage />}  /> 
      </Routes>
   
  )
}

export default App
