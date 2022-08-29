import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustBtn from '../CustBtn'

function Footer() {
  let navigate = useNavigate();
  return (
    <div className='w-full flex bg-green-800 text-white flex flex-col'>
        <div className='p-5 grid grid-cols-1 md:grid-cols-4  gap-8  px-8 sm:px-16 md:px-32'>
            <div className=''>
                <h1 className='font-semibold text-xl text-center md:text-start'>
                    About 
                </h1>
                <p className='text-base '>
                Pramanik is a central repository wherein the researchers can validate their documents with the inbuilt plagarism checker.
                </p>
            </div>
            <div className='flex flex-col items-center '>
                <h1 className='font-semibold text-xl'>
                    Get back to
                </h1>
                <div className='flex flex-col '>
                    <Link to='/'> ● Home</Link>
                    <Link to='/'> ● College List</Link>
                    <Link to='/'> ● Thesis</Link>
                    <Link to='/'> ● About Us</Link>
                </div>
            </div>
            <div className='flex flex-col items-center'>
                <h1 className='font-semibold text-xl'> Contact Us</h1>
                <p className=''>
                    +91 *** *** ****
                    sih*****@gmail.com
                </p>
            </div>
            <div className='w-full flex flex-col items-center'>
                <h1 className='font-semibold text-xl'> Pramanik</h1>
                <CustBtn title={"Login"} onClick={() => { navigate("/login");}}
                        extra={'py-2'}
                    // className="px-3 py-2 rounded-md text-sm font-medium bg-c1 text-white hover:text-c1 border border-c1 hover:bg-white transition ease-in-out duration-300 hover:scale-105"
                    />
            </div>
        </div>
        <div className='p-1 bg-green-900 text-white text-center'>
            Pramanik @ 2022
        </div>

    </div>
  )
}

export default Footer