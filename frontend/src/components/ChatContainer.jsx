import React, { useContext, useEffect, useRef, useState } from 'react'

import { formatMessagetime } from '../lib/utils'
import { MessageContext } from '../context/MessageContaxt'
import { AuthContext } from '../context/AuthContext'
import assets from '../assets/assets'
export const ChatContainer = ({ selectedUser, setSelectedUser }) => {
  const { user } = useContext(AuthContext)
  const scrollEnd = useRef()
  const [text, setText] = useState('')
  const {
    message,
    getMessage,
    sendMessage,
    onlineUsers,
    sendFile,
    backend_url,
  } = useContext(MessageContext)
  const [file, setFile] = useState(null)
  const isUserOnline =
    selectedUser && onlineUsers?.includes(selectedUser._id || selectedUser.id)

  useEffect(() => {
    if (selectedUser && user) {
      getMessage(user._id || user.id, selectedUser._id || selectedUser.id)
    }
  }, [selectedUser, user])

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'auto' })
    }
  }, [selectedUser])

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [message])

  const handleSend = async () => {
    if (!text && !file) return
    await sendMessage(selectedUser.id || selectedUser._id, text, file)
    setText('')
    setFile(null)
  }
  return selectedUser ? (
    <div className=" h-screen relative backdrop-blur-lg flex flex-col">
      {/* hearContent  */}
      <div className="sticky flex top-0 z-20 px-4 py-2 border-b border-stone-500 bg-black/60 backdrop-blur-md">
        <img
          src={selectedUser?.image || assets.profile_martin}
          alt=""
          className="w-8 rounded-full"
        />
        <p className="flex-1 text-lg text-white flex items-center gap-2">
          {selectedUser.firstName} {selectedUser.lastName}
          {isUserOnline && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
        </p>
        <img
          src={assets.arrow_icon}
          className=" md:hidden max-w-7"
          onClick={() => setSelectedUser(null)}
          alt=""
        />
        <img src={assets.help_icon} className="max-md:hidden max-w-5" alt="" />
      </div>

      {/* chat area  */}
      <div className="flex-1 h-[100vh] overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        {Array.isArray(message) &&
          message.map((msg, index) => {
            const isOwnMessage =
              String(msg.senderId).trim() === String(user?.id).trim()
            return (
              <div key={index}>
                <div
                  className={`flex items-end gap-2  text-white px-4 pt-4  ${
                    isOwnMessage ? 'ownDiv text-right' : 'notOwnDiv'
                  }`}
                >
                  {/* {console.log('imag ', msg)} */}
                  {msg.image ? (
                    // message img
                    <img
                      src={`${backend_url}${msg.file.fileUrl}`}
                      
                      alt=""
                      className="max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8"
                    />
                  ) : (
                    // message text
                    <p
                      className={`p-2 max-w-[200px] md:text-sm font-light bg-violet-400/20 rounded-lg mb-8 break-all text-white border
    ${isOwnMessage ? 'msg-own' : 'msg-other'}`}
                    >
                      {msg.message} {console.log("message" , msg)}
                    </p>
                  )}
                  {/* user profile icon and time  */}
                </div>
                <div className="text-center mt-[-20px] pt-[-10px] text-sm">
                  {/* <img src={msg.senderId === user._id ? assets.avatar_icon : assets.profile_martin} alt="" className='w-7 rounded-full' /> */}
                  <p className="text-gray-500">
                    {formatMessagetime(msg.createdAt)}{' '}
                  </p>
                </div>
              </div>
            )
          })}
        <div ref={scrollEnd}></div>
      </div>

      {/* bottom area  */}
      <div className="mt-2 sticky bottom-0 z-50 left-0 right-0 flex items-center gap-3 p-3">
        <div className="flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 text-sm border-none py-2 rounded-lg outline-none text-white placeholder-gray-400"
            type="text"
            placeholder="send a message"
          />

          <input
            onChange={(e) => sendFile(selectedUser.id, e.target.files[0])}
            type="file"
            id="image"
            accept="image/png , image/jpeg"
            hidden
          />
          <label htmlFor="image">
            <img
              src={assets.gallery_icon}
              className="w-5 mr-2 cursor-pointer"
              alt=""
            />
          </label>
        </div>
        <img
          src={assets.send_button}
          onClick={handleSend}
          className="w-7 cursor-pointer"
          alt=""
        />
      </div>
    </div>
  ) : (
    // not selectedUser then show
    <div className="flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/10 max-md:hidden">
      <img src={assets.logo_icon} className="max-md:hidden max-w-5" alt="" />
      <p className="text-lg font-medium text-white">Chat anytime , anywhere</p>
    </div>
  )
}
