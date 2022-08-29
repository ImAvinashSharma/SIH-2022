import React, { useState } from 'react'
import CustBtn from '../CustBtn'

function Profile() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")

  return (
    <div className='w-full flex flex-col items-center p-8'>
      <div className='w-full flex flex-col items-center'>
        <div className='w-72'>
          <label htmlFor="username" className='text-black pb-1'>Username</label>
          <input className="w-full p-2 text-base rounded mb-3  border px-4" type="text" id="username" placeholder="Enter Username" 
              value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className='w-72'>
          <label htmlFor="email" className='text-black pb-1'>Email</label>
          <input className="w-full p-2 text-base rounded mb-3  border px-4" type="email" id="email" placeholder="Enter email" 
              value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className='w-72'>
          <label htmlFor="password" className='text-black pb-1'>Password</label>
          <input className="w-full p-2 text-base rounded mb-3  border px-4" type="password" id="password" placeholder="Enter new Password" 
              value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className='w-72'>
          <CustBtn title={"Update"} extra="m-0 w-full" />
        </div>
      </div>
    </div>
  )
}

export default Profile