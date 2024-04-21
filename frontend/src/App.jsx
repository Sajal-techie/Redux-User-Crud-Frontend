
import './App.css'
import { Link,Route,Routes } from 'react-router-dom'
import Signup from './Components/Signup/Signup'
import LoginPage from './Pages/LoginPage'
import Navbar from './Components/Navbar/Navbar'
import SignupPage from './Pages/SignupPage'
import HomePage from './Pages/HomePage'
import ProfilePage from './Pages/ProfilePage'
function App() {
 

  return (
    <>
      <Routes>

        <Route path='/login' element={<LoginPage/>} /> 
        <Route path='/signup' element={<SignupPage/>}/> 
        <Route  path='/' element={<HomePage/>} />
        <Route  path='/profile' element={<ProfilePage/>} />
      </Routes>
    </>
  )
}

export default App
