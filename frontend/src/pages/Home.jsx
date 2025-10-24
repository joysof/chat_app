import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import { ChatContainer } from '../components/ChatContainer'
import RightSidebar from '../components/RightSidebar'

const Home = () => {

  const [selectedUser , setSelectedUser] = useState()
  return (
    <div className='border w-full h-screen  grid sm:px-[15%] sm:py-[5%]'>
        <div className={`backdrop-blur-xl sm:px-[10%] sm:py-[5%] overflow-hidden h-[100%] grid grid-cols-1 relative ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] lg:grid-cols-[1fr_2fr_1fr]':'md:grid-cols-2'}`}>

          <div className=' overflow-y-auto'>
          <Sidebar selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
          </div>
         <div className=' overflow-y-auto'>
           <ChatContainer selectedUser={selectedUser} setSelectedUser={setSelectedUser}/>
         </div>
          <div className=' overflow-y-auto'>
            <RightSidebar selectedUser={selectedUser}/>
          </div>
        </div>
    </div>
  )
}

export default Home