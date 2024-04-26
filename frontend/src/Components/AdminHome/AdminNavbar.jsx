import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Featues/UserSlice'

const AdminNavbar = ({userList,setUserList}) => {
    const [searchData,setSearchData] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const admin = useSelector(state=>state.superuser)
    console.log(admin,'sadminaem');
    const handleLogout = ()=>{
        localStorage.removeItem('jwtTokenAdmin')
        dispatch(logout())
        navigate('/admin_login')
    }
    const handleChange = (e)=>{
        const searchvalue =  e.target.value.toLowerCase();
        setSearchData(searchvalue)
        
        const filteredUserList = userList.filter(user => {
            return user.username.toLowerCase().startsWith(searchvalue);
          });
          setUserList(filteredUserList)

    }

  return (
    <nav className=" bg-white w-full flex relative justify-between items-center mx-auto px-8 h-20">
    {/* <!-- logo --> */}
    <div className="inline-flex">
        <a className="_o6689fn" href="/">
             <div className="hidden md:block">
                <div style={{display:'block'}}>    
                  <h1 className='w-full text-3xl font-bold text-[#0b00df] capitalize'>{admin}</h1>
                </div>
             </div>
            <div className="block md:hidden">
               <svg width="30" height="32" fill="currentcolor" style={{display: 'block'}}>
                    <path d="M29.24 22.68c-.16-.39-.31-.8-.47-1.15l-.74-1.67-.03-.03c-2.2-4.8-4.55-9.68-7.04-14.48l-.1-.2c-.25-.47-.5-.99-.76-1.47-.32-.57-.63-1.18-1.14-1.76a5.3 5.3 0 00-8.2 0c-.47.58-.82 1.19-1.14 1.76-.25.52-.5 1.03-.76 1.5l-.1.2c-2.45 4.8-4.84 9.68-7.04 14.48l-.06.06c-.22.52-.48 1.06-.73 1.64-.16.35-.32.73-.48 1.15a6.8 6.8 0 007.2 9.23 8.38 8.38 0 003.18-1.1c1.3-.73 2.55-1.79 3.95-3.32 1.4 1.53 2.68 2.59 3.95 3.33A8.38 8.38 0 0022.75 32a6.79 6.79 0 006.75-5.83 5.94 5.94 0 00-.26-3.5zm-14.36 1.66c-1.72-2.2-2.84-4.22-3.22-5.95a5.2 5.2 0 01-.1-1.96c.07-.51.26-.96.52-1.34.6-.87 1.65-1.41 2.8-1.41a3.3 3.3 0 012.8 1.4c.26.4.45.84.51 1.35.1.58.06 1.25-.1 1.96-.38 1.7-1.5 3.74-3.21 5.95zm12.74 1.48a4.76 4.76 0 01-2.9 3.75c-.76.32-1.6.41-2.42.32-.8-.1-1.6-.36-2.42-.84a15.64 15.64 0 01-3.63-3.1c2.1-2.6 3.37-4.97 3.85-7.08.23-1 .26-1.9.16-2.73a5.53 5.53 0 00-.86-2.2 5.36 5.36 0 00-4.49-2.28c-1.85 0-3.5.86-4.5 2.27a5.18 5.18 0 00-.85 2.21c-.13.84-.1 1.77.16 2.73.48 2.11 1.78 4.51 3.85 7.1a14.33 14.33 0 01-3.63 3.12c-.83.48-1.62.73-2.42.83a4.76 4.76 0 01-5.32-4.07c-.1-.8-.03-1.6.29-2.5.1-.32.25-.64.41-1.02.22-.52.48-1.06.73-1.6l.04-.07c2.16-4.77 4.52-9.64 6.97-14.41l.1-.2c.25-.48.5-.99.76-1.47.26-.51.54-1 .9-1.4a3.32 3.32 0 015.09 0c.35.4.64.89.9 1.4.25.48.5 1 .76 1.47l.1.2c2.44 4.77 4.8 9.64 7 14.41l.03.03c.26.52.48 1.1.73 1.6.16.39.32.7.42 1.03.19.9.29 1.7.19 2.5z"></path>
                </svg>
            </div>
        </a>
    </div>

    {/* <!-- end logo --> */}

    {/* <!-- search bar --> */}
    <div className=" flex-shrink flex-grow-0 justify-start px-2 w-screen">
        <div className="inline-block w-full">
             <form>
                <div className="inline-flex items-center max-w-full w-full  md:px-20 lg:px-40">
                    <div className="flex items-center flex-grow-0 flex-shrink pl-2 relative  border rounded-full px-1  py-1 bg-gray-200 w-full" >
                        
                        <input type="text" placeholder='search user' className='border-0  outline-none bg-gray-200 ps-2 w-full'  onChange={handleChange} value={searchData} />
                        <div className="flex items-center justify-center relative  h-8 w-8 rounded-full">
                        <svg 
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                role="presentation"
                                focusable="false"
                                style=
                                    {{display: 'block',
                                    fill: 'none',
                                    height: '12px',
                                    width: '12px',
                                    stroke: 'currentcolor',
                                    strokeWidth:' 5.33333',
                                    overflow: 'visible'}}
                                
                            >
                                <g fill="none">
                                    <path
                                        d="m13 24c6.0751322 0 11-4.9248678 11-11 0-6.07513225-4.9248678-11-11-11-6.07513225 0-11 4.92486775-11 11 0 6.0751322 4.92486775 11 11 11zm8-3 9 9"
                                    ></path>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    {/* <!-- end search bar --> */}

    {/* <!-- logout --> */}
    <div className="flex-initial">
      <div className="flex justify-end items-center relative">
       
        <div className="flex mr-4 items-center">
          <Link className="inline-block py-2 px-3 bg-green-200 hover:bg-green-400 rounded-full" to={'/add_user'}> 
            <div className="flex items-center relative cursor-pointer whitespace-nowrap">Add new User</div>
          </Link>
        </div>

        <div className="block">
            <div className="inline relative">
                <button type="button" className="inline-flex items-center relative px-2 border rounded-full hover:shadow-lg" onClick={handleLogout}>
                    <div className="pl-1">
                        Logout
                    </div>

                    <div className="block flex-grow-0 flex-shrink-0 h-10 w-12 pl-5">
                         <svg
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            role="presentation"
                            focusable="false"
                            style={{display: 'block', height: '100%', width: '100%', fill: 'currentcolor'}}
                        >
                            <path d="m16 .7c-8.437 0-15.3 6.863-15.3 15.3s6.863 15.3 15.3 15.3 15.3-6.863 15.3-15.3-6.863-15.3-15.3-15.3zm0 28c-4.021 0-7.605-1.884-9.933-4.81a12.425 12.425 0 0 1 6.451-4.4 6.507 6.507 0 0 1 -3.018-5.49c0-3.584 2.916-6.5 6.5-6.5s6.5 2.916 6.5 6.5a6.513 6.513 0 0 1 -3.019 5.491 12.42 12.42 0 0 1 6.452 4.4c-2.328 2.925-5.912 4.809-9.933 4.809z"></path>
                        </svg> 
                    </div>
                </button>
            </div>
        </div>
      </div>
    </div>
    {/* <!-- end login --> */}
</nav>
  )
}

export default AdminNavbar
