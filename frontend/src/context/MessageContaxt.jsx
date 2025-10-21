import { createContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import axios from 'axios'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify'

export const MessageContext = createContext()

export const MessageProvider = ({ children, user }) => {
  const [message, setMessage] = useState([])
  const [loading, setLoding] = useState(false)
  const [socket, setSocket] = useState(null)
  const backend_url = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    if (user?.token) {
      const newSocket = io(backend_url, {
        auth: { token: user.token },
      })
      newSocket.on('connect', () => {
        console.log('conected to socket server')
      })
      newSocket.on('new-message', (data) => {
        setMessage((prev) => [...prev, data])
        toast.info('new message received')
      })
      setSocket(newSocket)
      return () => newSocket.disconnect()
    }
  }, [user?.token])

  const getMessage = async (senderId, receiverId) => {
    setLoding(true)
    try {
      const res = await axios.get(`${backend_url}/api/v1/message`, {
        params: { senderId, receiverId },
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setMessage(res.data.data)
    } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch messages")
      console.log(error)
    } finally {
      setLoding(false)
    }
  }

  const sendMessage = async(receiverId , text , file) =>{
    try {
        const formData = new FormData()
        formData.append("reciverId" , receiverId)
        formData.append("message" , text)
        if(file) formData.append("file" , file)
        
            const res = await axios.post(`${backend_url}/api/v1/message`,
                formData,{
                    headers:{
                         Authorization: `Bearer ${user.token}`,
            "Content-Type": "multipart/form-data",
                    }
                }
            )
            if (socket) socket.emit("new-message" , res.data.data)
                setMessage((prev) => [...prev , res.data.data])
            toast.success(res.data.message)
    } catch (error) {
        toast.error(error.response?.data?.message)
    }
  }

  return (
    <MessageContext.Provider value={{ getMessage, message, loading }}>
      {children}
    </MessageContext.Provider>
  )
}
