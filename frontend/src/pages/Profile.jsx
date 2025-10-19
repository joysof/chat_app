import React, { useState } from 'react'
import assets from '../assets/assets'
import { useNavigate } from 'react-router-dom'
const Profile = () => {
  const [selectedImg, setSelectedImg] = useState(null)
  const [name, setName] = useState('Your name')
  const navigate = useNavigate()


  const handleSubmit = async(e)=>{
      e.preventDefault()
      navigate('/')    
  }
  return (
    <div className="min-h-screen bg-cover bg-no-repeat flex items-center justify-center">
      {/* left side  */}
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex items-center justify-between max-sm:flex-col-reverse">
        <form onSubmit={handleSubmit}  className="flex flex-col gap-5 p-10 flex-1">
          <h3 className="text-lg capitalize">Profile details </h3>
          <label
            htmlFor="avatar"
            className="flex items-center gap3 cursor-pointer"
          >
            <input
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type="file"
              id="avatar"
              accept=".png , .jpg , .jpeg"
              hidden
            />
            <img
              src={
                selectedImg
                  ? URL.createObjectURL(selectedImg)
                  : assets.avatar_icon
              }
              className={`w-12 h-12 ${selectedImg && 'rounded-full'}`}
              alt=""
            />
            upload profile image
          </label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text"
            placeholder="your name "
            className=" p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
          <button className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer' type='submit'>save</button>
        </form>
        <img src={assets.logo_icon} className='max-w-44 aspect-square rounded-full mx-10 max-sm:mt-10 ' alt="" />
      </div>
    </div>
  )
}

export default Profile
