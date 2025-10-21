import React, { useContext, useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMessagetime } from '../lib/utils'
import { MessageContext } from '../context/MessageContaxt'
import { AuthContext } from '../context/AuthContext'

export const ChatContainer = ({selectedUser,setSelectedUser}) => {
  const {user} = useContext(AuthContext)
  const scrollEnd = useRef()

  const {message , getMessage} = useContext(MessageContext)

  useEffect(() =>{
    if (selectedUser && user) {
      getMessage(user._id , selectedUser._id)      
    }
  },[selectedUser , user])









  useEffect(() => {
  if (scrollEnd.current) {
    scrollEnd.current.scrollIntoView({ behavior: "smooth" });
  }
}, [message]);


  return selectedUser? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg flex flex-col'>
    <div >
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
    
    {message.map((msg ,index) =>(
      <div key={index} className={`flex items-end gap-2 justify-end  overflow-y-auto px-4 pt-4  ${msg.senderId !== user?._id
 && 'flex-row-reverse'}`}>
        {msg.image ? (
          // message img 
          <img src={msg.image} alt="" className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' />
        ):(
          // message text 
          <p className={`p-2 max-w-[200px] md:text-sm font-light rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId !== user?._id ? ' rounded-br-none' : ' rounded-bl-none'}`}>{msg.text}</p>
        )}
        {/* user profile icon and time  */}
        <div className='text-center text-sm'>
          <img src={msg.senderId === user._id ? assets.avatar_icon : assets.profile_martin} alt="" className='w-7 rounded-full' />
          <p className='text-gray-500'>{ formatMessagetime(msg.createdAt)} </p>
        </div>
        
      </div>
    ))}

    <div ref={scrollEnd}></div>
    </div>
      {/* bottom area  */}
    <div className='sticky bottom-0 mt-2 left-0 right-0 flex items-center gap-3 p-3'>
      <div className='flex-1 flex items-center bg-gray-100/12 px-3 rounded-full'>
        <input className='flex-1 text-sm border-none py-2 rounded-lg outline-none text-white placeholder-gray-400' type="text" placeholder='send a message' />
        <input type="file" id='image' accept='image/png , image/jpeg' hidden />
        <label htmlFor="image"><img src={assets.gallery_icon} className='w-5 mr-2 cursor-pointer' alt="" /></label>
      </div>
      <img src={assets.send_button} className='w-7 cursor-pointer' alt="" />
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
