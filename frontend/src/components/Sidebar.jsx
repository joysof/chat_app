import React, { useContext, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext'
import { MessageContext } from '../context/MessageContaxt'
const Sidebar = ({selectedUser,setSelectedUser}) => {
const navigate = useNavigate()
const {users , logout } = useContext(AuthContext)
const {onlineUsers , unreadCounts} = useContext(MessageContext)
const [search , setSearch] = useState('')
  const filterUser = Array.isArray(users?.attributes?.results)? users?.attributes?.results.filter((user) =>(
    `${user.firstName}${user.lastName}`.toLowerCase().includes(search.toLowerCase())
  )) : []
  console.log('unread message' , unreadCounts)
  return (
    <div className={`bg-[#8185b2]/10 h-screen overflow-y-auto rounded-r-xl sticky top-0 text-white ${selectedUser ? 'max-md:hidden' : ''}`}>
      <div className='pb-5'>

        {/* edit profile and loguot  */}
        <div className='flex justify-between items-center'>
            <img src={assets.logo} alt="logo" className='max-w-40' />
            <div className='relative py-2 group'>
              <img src={assets.menu_icon} alt="Menu"  className='max-h-5 cursor-pointer '/>
              <div className=' absolute top-full right-0 z-20 w-32 p-5 rounded-md bg-[#282142] border border-gray-600 text-gray-100 hidden group-hover:block'>
                <p onClick={() =>navigate('/profile')} className=' cursor-pointer text-sm'>Edit profile</p>
                <hr className='my-2 border-t border-gray-500' />
                <p className=' cursor-pointer text-sm'onClick={logout}>Logout</p>
              </div>
            </div>
        </div>

        {/* search user  */}
        <div className='bg-[#282142] mb-4 rounded-full flex items-center gap-2 py-3 px-4 mt-5'>
          <img src={assets.search_icon} alt="search"  className='w-3'/>
          <input type="text" className='bg-transparent border-none outline-none text-white text-xs placeholder-[#c8c8c8]  flex-1' placeholder='search user' onChange={(e) =>setSearch(e.target.value)}/>
        </div>

        <div className='flex flex-col gap-4'>
          {/* user data  */}
          {filterUser.map((user , index) =>(
            <div onClick={() =>{setSelectedUser(user)}} key={index} className= {`relative flex items-center gap-2 p-2 pl-4 rounded cursor-pointer max-sm:text-sm ${selectedUser?._id === user._id && 'bg-[#282142]/50'}`}>
              <img src={user.profilePic || assets.avatar_icon } className='w-[35px] aspect-[1/1] rounded-full' alt="" />
              <div className='flex flex-col leading-5'>
                <p>{user.firstName} { user.lastName}</p>
                {
                
                onlineUsers?.includes(user.id)
                ? <span className='text-green-400 text-sm online'>Online</span>
                : <span className='text-neutral-400'>Offline</span>
                }
                
              </div>
              {/* unread messag show  */}

            {unreadCounts[user.id] > 0 && (
            <span className="absolute top-4 right-4 text-xs h-5 w-5 flex justify-center items-center rounded-full bg-violet-500/50">
                {unreadCounts[user.id]
                }
            </span>
        )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}


export default Sidebar