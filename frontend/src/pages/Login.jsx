import React, { useContext, useState } from 'react'
import assets from '../assets/assets'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [currentState , setCurrentState] = useState("Sing Up")
  const [firstName, setfirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email , setEmail] = useState('')
  const [Password , setPassword] = useState('')
  const [bio , setBio] = useState('')
  const {login , register} = useContext(AuthContext)
  const [isDataSubmitted , setIsDataSubmitted] = useState(false)

  const navigate = useNavigate()

  const onsubmitHandler = (e) =>{
    e.preventDefault()
    if (currentState === "Sing Up") {
      register(firstName , lastName , email , Password)
      navigate('/profile')
    }else{
      login(email , Password)
      navigate('/')
    }
    
    if (currentState === 'Sing Up' && !isDataSubmitted) {
      setIsDataSubmitted(true)
      return
    }
  }
  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

        {/* left side  */}
        <img src={assets.logo} className='w-[min(30vw , 250px)]' alt="" />

        {/* right side  */}

        <form onSubmit={onsubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
            <h2 className=' font-medium text-2xl flex justify-between items-center '>{currentState}
             {isDataSubmitted && (
              <img onClick={() =>setIsDataSubmitted(false)} src={assets.arrow_icon} className='w-5 cursor-pointer' alt="" />
             )} 
            </h2>
            {currentState === 'Sing Up' && !isDataSubmitted &&(
              <>
              <input
                onChange={(e) =>setfirstName(e.target.value)} value={firstName}
                type="text" className=' p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Frist Name' required />
              <input
                onChange={(e) =>setLastName(e.target.value)} value={lastName}
                type="text" className=' p-2 border border-gray-500 rounded-md focus:outline-none' placeholder='Last Name' required />
              </>
                
            )}
            {
              !isDataSubmitted && (
                <>
                <input type="email" placeholder='Email Address' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' onChange={(e) =>setEmail(e.target.value) } value={email}/>
                <input type="password" placeholder='password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' onChange={(e) =>setPassword(e.target.value) } value={Password}/>
                </>
              )}
              {
                currentState === 'Sing Up' && isDataSubmitted && (
                  <textarea onChange={(e)=>setBio(e.target.value)} value={bio} role='4' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500' placeholder='Provide a  Short bio...' required>

                  </textarea>

                )
              }
            <button type='submit' className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'>{currentState === 'Sing Up' ? "Create Accout" : "Login Now"}</button>

            <div className='flex items-center gap-2 text-sm text-gray-500'>
              <input type="checkbox"  />
              <p>Agree to the terms of use & privacy policy</p>
            </div>
            <div className='flex flex-col gap-2'>
              {currentState === 'Sing Up' ? 
              
              (<p className='text-sm text-gray-600'>Already have an account? <span onClick={() => setCurrentState("Login")} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>) : 
              
              (<p className='text-sm text-gray-600'>create an account?<span onClick={() => setCurrentState("Sing Up")} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>)}
            </div>
        </form>
    </div>
  )
}

export default Login