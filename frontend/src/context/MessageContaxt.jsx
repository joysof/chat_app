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
  const socket_url = import.meta.env.VITE_SOCKET_URL
  const {token , user } = useContext(AuthContext)
  const[onlineUsers , setOnlineUsers] = useState([])
  const [unreadCounts , setUnreadCounts] = useState({})

  console.log("socket_url" , socket_url)
  useEffect(() => {
    console.log("user context ", user?.id)
    if(!token) return;
    if (token) {
      const newSocket = io(socket_url, {
        withCredentials: true,
        auth: { token:token },
      })
      newSocket.on('connect', () => {
        console.log('conected to socket server')
        if(user?.id){
          newSocket.emit('add-user' , user?.id)
        }
      })
      newSocket.on('get-online-users' , (users) =>{
        setOnlineUsers(users)
      })

      newSocket.on('new-message', (data) => {
        console.log("message data" ,data)
        const senderId = data.attributes.senderId
        setUnreadCounts(pre => ({
          ...pre,
          [senderId] : (pre[senderId] || 0) + 1
        }))

        setMessage((prev) => [...prev, data.attributes])
        toast.info('new message received')
      })
      setSocket(newSocket)
      return () => newSocket.disconnect()
    }
  }, [token ,user?.id])

  const getMessage = async (senderId, receiverId) => {

    if(!token) return
    setLoding(true)
    try {
      const res = await axios.get(`${backend_url}/api/v1/message`, {
        params: { senderId, receiverId },
        headers: { Authorization: `Bearer ${token}` },
      })
      setMessage(res.data.data.attributes)
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch messages')
      console.log(error)
    } finally {
      setLoding(false)
    }
  }

  const sendMessage = async (receiverId , message, file) => {
    try {
      const formData = new FormData()
      formData.append('receiverId', receiverId)
      formData.append('message', message)
      if (file) formData.append('file', file)
      const res = await axios.post(`${backend_url}/api/v1/message`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })

      
      setMessage((prev) => [...prev, res.data.data.attributes])
    if (socket && receiverId) {
      socket.emit("new-message" , {
        ...res.data.data,
        receiverId
      })
    }
      toast.success(res.data.message)
    } catch (error) {
      toast.error(error.response?.data?.message)
    }
  }

  const deleteMessage = async (messageId) => {
    try {
      const res = axios.delete(`${backend_url}/api/v1/message/${messageId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setMessage((prev) => prev.filter((m) => m._id !== messageId))
      toast.success(res.data.message || 'Message deleted successfully')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Tailed to delete message')
    }
  }

  const resetUnreadMessage = (userId) =>{
    setUnreadCounts(pre => ({
      ...pre ,
      [userId] : 0
    }))
  }

  const sendFile = async (receiverId , file) =>{
    if (!receiverId) {
  toast.error("Please select a user to send message");
  return;
}
    if (!file) return
    const formData = new FormData();
    formData.append('receiverId' , receiverId);
    formData.append("file" , file)
    try {
      const res = await axios.post(`${backend_url}/api/v1/message/file` , formData ,{
        headers : {
          Authorization : `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      setMessage(pre => [...pre , res.data.data.attributes])
      if (socket) {
        socket.emit("new-message" , {
          ...res.data.data,
          receiverId
        })
      }
      
    toast.success('File sent successfully');
    } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to send file');
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
        onlineUsers,
        unreadCounts,
        resetUnreadMessage,
        sendFile,
        backend_url
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}
