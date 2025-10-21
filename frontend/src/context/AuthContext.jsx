import { createContext, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const AuthContext = createContext()

export const AuhtProvider = ({ children }) => {

  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem('token') || null)
  const navigate = useNavigate()
  const [loading, setLoding] = useState(false)

  const backend_url = import.meta.env.VITE_BACKEND_URL

  const login = async (email, password) => {
    setLoding(true)
    try {
      const res = await axios.post(`${backend_url}/api/v1/auth/login`, {
        email,
        password,
      })
      setUser(res.data.data.attributes.user)
      setToken(res.data.data.attributes.tokens)
      localStorage.setItem(
        'token',
        res.data.data.attributes.tokens.access.token
      )
      toast.success(res.data.message || "Login successful")
      navigate('/')
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || "Login failed! Please try again.";
      toast.error(errorMsg)
    } finally {
      setLoding(false)
    }
  }

  const register = async (firstName, lastName, email, password) => {
    setLoding(true)
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
    navigate('/login')
  }
  return (
    <AuthContext.Provider
      value={{
        user,
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
