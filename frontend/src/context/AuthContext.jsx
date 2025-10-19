import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



export const AuthContext = createContext()


export const AuhtProvider = ({children}) =>{
    const [user , setUser] = useState(null)
    const [token , setToken ] = useState(localStorage.getItem("token") || null)
    const navigate = useNavigate()
    const [loading , setLoding] = useState(false)

    const backend_url = import.meta.env.VITE_BACKEND_URL
    const login = async (email , password) =>{
        setLoding(true)
        try {
            const res = await axios.post(`${backend_url}/api/v1/auth/login` , {email , password})
            setUser(res.data.data.attributes.user)
            setToken(res.data.data.attributes.tokens)
            localStorage.setItem("token" , res.data.data.attributes.tokens.access.token)
        } catch (error) {
            console.log(error)
        }finally{
            setLoding(false)
        }
    }

    const register = async ( firstName , lastName, email , password , bio) =>{
        setLoding(true)
        try {
            const res = await axios.post(`${backend_url}/api/v1/auth/register` , {firstName , lastName , email , password , bio})
             const user = res.data.data.attributes.user
            setUser(user)
            const registeredEmail = res.data.data?.email || email
            localStorage.setItem("email", registeredEmail?.trim().toLowerCase())
            console.log(registeredEmail)
            navigate("/verify-email")
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthContext.Provider value={{user , token , loading ,register , login , backend_url}}>
            {children}
        </AuthContext.Provider>
    )
}