import { createContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useEffect } from 'react'

export const AuthContext = createContext()

export const AuhtProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [users,setUsers] = useState('')
  const backend_url = import.meta.env.VITE_BACKEND_URL



useEffect(() =>{ 
 const savedUser = localStorage.getItem('user')
    if(savedUser){
      setUser(JSON.parse(savedUser))
    }
  const fetchUsers = async () =>{ 
    const token = localStorage.getItem('token') 
    const res = await axios.get(`${backend_url}/api/v1/users`,{
      headers :{Authorization :` Bearer ${token}`} }) 
      setUsers(res.data.data) } 
      fetchUsers() 
    },[])


  const login = async (email, password) => {
    setLoading(true)
    try {
      const res = await axios.post(`${backend_url}/api/v1/auth/login`, {
        email,
        password,
      })
    const accessToken = res.data.data.attributes.tokens.access.token
    setToken(accessToken)

    const logInUser = res.data.data.attributes.user 
    setUser(logInUser)

    localStorage.setItem('user' , JSON.stringify(logInUser))
    
    localStorage.setItem('token', accessToken)
      toast.success(res.data.message || "Login successful")
      navigate('/')
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Login failed! Please try again.";
      toast.error(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const register = async (firstName, lastName, email, password) => {
    setLoading(true)
    try {
      const res = await axios.post(`${backend_url}/api/v1/auth/register`, {
        firstName,
        lastName,
        email,
        password,
      })
      const user = res.data.data.attributes.user
      setUser(user)
      const registeredEmail = res.data.data?.email || email
      localStorage.setItem('email', registeredEmail?.trim().toLowerCase())

      toast.success(res.data.message)

      navigate('/verify-email')
    } catch (error) {
      const errorMsg = error.response?.data?.message || "something went wrong place try agin "
      toast.error(errorMsg)
    }
  }
  const logout = async () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        token,
        loading,
        register,
        login,
        navigate,
        backend_url,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
