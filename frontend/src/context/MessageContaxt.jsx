import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
 export const MessageContext = createContext()

 export const MessageProvider = ({children }) =>{
    // const {user} = useContext(AuthContext)
    const [message , setMessage] = useState([])
    const [loading , setLoding] = useState(false)



      const backend_url = import.meta.env.VITE_BACKEND_URL

    const getMessage = async (receiverId) =>{
        setLoding(true)
        try {
            const res = await axios.get(`${backend_url}/api/message`,{
                 params: { receiverId }
            })
            setMessage(res.data)
        } catch (error) {
            console.log(error)
        }finally{
            setLoding(false)
        }
    }

    return(
        <MessageContext.Provider value={{getMessage ,message, loading}}>
                {children}
        </MessageContext.Provider>
    )
}