import { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'
import axios from 'axios'
import { io } from 'socket.io-client'
import { toast } from 'react-toastify'

export const MessageContext = createContext()

export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState([])
  const [loading, setLoding] = useState(false)
  const [socket, setSocket] = useState(null)
  const backend_url = import.meta.env.VITE_BACKEND_URL
  const { user } = useContext(AuthContext)

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
      toast.error(error.response?.data?.message || 'Failed to fetch messages')
      console.log(error)
    } finally {
      setLoding(false)
    }
  }
  console.log("message from messageContext" ,message)
  const sendMessage = async (receiverId, text, file) => {
    try {
      const formData = new FormData()
      formData.append('reciverId', receiverId)
      formData.append('message', text)
      if (file) formData.append('file', file)

      const res = await axios.post(`${backend_url}/api/v1/message`, formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      if (socket)socket.emit('new-message', res.data.data)
      setMessage((prev) => [...prev, res.data.data])
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const deleteMessage = async (messageId) => {
    try {
      const res = axios.delete(`${backend_url}/api/v1/message/${messageId}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      setMessage((prev) => prev.filter((m) => m._id !== messageId))
      toast.success(res.data.message || 'Message deleted successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Tailed to delete message')
    }
  }

  return (
    <MessageContext.Provider
      value={{
        getMessage,
        message,
        loading,
        setMessage,
        sendMessage,
        deleteMessage,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
