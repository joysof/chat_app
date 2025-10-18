import React from 'react'
import Sidebar from '../components/Sidebar'
import { ChatContainer } from '../components/ChatContainer'
import RishtSideber from '../components/RishtSideber'

const Home = () => {

  const [selectedUser , setSele]
  return (
    <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
        <div className='backdrop-blur-xl sm:px-[10%] sm:py-[5%] overflow-hidden h-[100%] grid-cols-1 relative'>
          <Sidebar/>
          <ChatContainer/>
          <RishtSideber/>
        </div>
    </div>
  )
}

export default Home