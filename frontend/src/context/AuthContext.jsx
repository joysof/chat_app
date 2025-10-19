import { createContext, useState } from "react";
import axios from "axios";



export const AuthContext = createContext()


export const AuhtProvider = ({children}) =>{
    const [user , setUser] = useState(null)
    const [token , setToken ] = useState(localStorage.getItem("token") || null)

    const [loading , setLoding] = useState(false)

    const login = async (email , password) =>{
        setLoding(true)
        try {
            const res = await axios.post("http://192.168.0.106:3000/api/v1/auth/login" , {email , password})
            setUser(res.data.data.attributes.user)
            setToken(res.data.data.attributes.tokens)
            localStorage.setItem("token" , res.data.data.attributes.tokens.access.token)
        } catch (error) {
            console.log(error)
        }finally{
            setLoding(false)
        }
    }

    return (
        <AuthContext.Provider value={{user , token , loading , login}}>
            {children}
        </AuthContext.Provider>
    )
}