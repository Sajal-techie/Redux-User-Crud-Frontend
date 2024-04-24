
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
function App() {
 

  return (
    <>
      <Routes>

        <Route path='/login' element={<LoginPage/>} /> 
        <Route path='/signup' element={<SignupPage/>}/> 
        <Route  path='/' element={<HomePage/>} />
        <Route  path='/profile' element={<ProfilePage/>} />
        <Route  path='/admin_home' element={<AdminDashboard/>} />
        <Route  path='/add_user' element={<Add_User/>} />
      </Routes>
    </>
  )
}

export default App
