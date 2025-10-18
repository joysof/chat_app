import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessagetime } from '../lib/utils'

export const ChatContainer = ({selectedUser,setSelectedUser}) => {

  const scrollEnd = useRef()

  useEffect(() => {
  if (scrollEnd.current) {
    scrollEnd.current.scrollIntoView({ behavior: "smooth" });
  }
}, []);


  return selectedUser? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
      {/* hearContent  */}
      <div className='flex items-center gap-3 mx-4 border-b border-stone-500 '>
        <img src={assets.profile_martin} alt=""  className='w-8 rounded-full'/>
        <p className='flex-1 text-lg text-white flex items-center gap-2'>Martin Johson
          <span className='w-2 h-2 rounded-full bg-green-500'></span>
        </p>
        <img src={assets.arrow_icon} className=' md:hidden max-w-7' onClick={()=>setSelectedUser(null)} alt="" />
        <img src={assets.help_icon} className='max-md:hidden max-w-5' alt="" />
      </div>


    {/* chat area  */}

    {messagesDummyData.map((msg ,index) =>(
      <div key={index} className={`flex items-end gap-2 justify-end ${msg.senderId !== '680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`}>
        {msg.image ? (
          // message img 
          <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
        ):(
          // message text 
          <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId !== '680f50e4f10f3cd28382ecf9' ? ' rounded-br-none' : ' rounded-bl-none'}`}>{msg.text}</p>
        )}
        {/* user profile icon and time  */}
        <div className='text-center text-sm'>
          <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} alt="" className='w-7 rounded-full' />
          <p className='text-gray-500'>{ formatMessagetime(msg.createdAt)} </p>
        </div>
        
      </div>
    ))}

    <div ref={scrollEnd}>

    </div>




    </div>
  ): (
    // not selectedUser then show 
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden'>
      <img src={assets.logo_icon} className='max-md:hidden max-w-5' alt="" />
      <p className='text-lg font-medium text-white'>Chat anytime , anywhere</p>
    </div>
  )
}
