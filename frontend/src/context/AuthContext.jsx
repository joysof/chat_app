import { createContext, useState } from "react";
import axios from "axios";



export const AuthContext = createContext()


export const AuhtProvider = ({children}) =>{
    const [user , setUser] = useState(null)
    const [token , setToken ] = useState(localStorage.getItem("token") || null)

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

            setUser(res.data.data.attributes.user)
            
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <AuthContext.Provider value={{user , token , loading ,register , login}}>
            {children}
        </AuthContext.Provider>
    )
}