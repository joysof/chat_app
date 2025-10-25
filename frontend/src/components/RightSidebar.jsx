import React, { useContext } from 'react'
import { MessageContext } from '../context/MessageContaxt'
import { AuthContext } from '../context/AuthContext'
import assets from '../assets/assets'
const RightSidebar = ({selectedUser}) => {

  const {message} = useContext(MessageContext)
  const {logout} = useContext(AuthContext)
  console.log(message)
  return selectedUser &&(
    <div className={`bg-[#8185b2]/10 text-white w-full relative overflow-y-scroll ${selectedUser ? 'max-md:hidden' : ''} `}>
      {/* user data  */}
        <div className='pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto'> 
          <img src={selectedUser?.image || assets.avatar_icon} alt="" className='w-20 aspect-[1/1] rounded-full' />
          <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
            <p className='w-2 h-2 rounded-full bg-green-400'></p>
            {selectedUser.firstName} {selectedUser.lastName} </h1>
            <p className='px-10 mx-auto'>{selectedUser.bio}</p>
        </div>
        <hr  className='border-[#ffffff50 my-2]'/>
           
           {/* photo section  */}
        <div className='px-5 text-xs '>
          <p>Media</p>
          <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80'>
            {
             message.map((msg , index) =>(
                <div key={index} onClick={() =>window.open(msg)} className=' cursor-pointer rounded'>
                  <img src={''} alt=""  className='w-full rounded-md'/>
                </div>
              ))
            }
          </div>
             <button onClick={logout}  className=' absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 rounded-full cursor-pointer px-20 ' >Logout</button>
        </div>
    </div>
  )
}

export default RightSidebar