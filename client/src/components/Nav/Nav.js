import useTheme from '../../hooks/useTheme';
import { IoIosContrast } from "react-icons/io";
import { GrLanguage } from "react-icons/gr";

import React, { useState } from "react";
import { Transition } from "@headlessui/react";
import { NavLink, useNavigate } from "react-router-dom";
// import AddCollege from "../pages/AddCollege";
import useAuth from '../../hooks/useAuth';
import CustBtn from '../CustBtn';
import logo from '../../assets/img/logo.webp'
function Nav() {
    const [nextTheme, setTheme] = useTheme();
    const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  const { userData, logout } = useAuth();
  const linkStyle = ' text-black hover:text-c1 hover:text-c1 px-3 py-2 rounded-md text-sm font-medium '
  const activeLinkStyle = 'text-c1  px-3 py-2 rounded-md text-sm font-medium underline underline-offset-8 decoration-4 decoration-c1'
  const activeLinkStyleMobile = 'text-white bg-c1 block px-3 py-2 rounded-md text-sm font-medium text-center'
  const linkStyleMobile = 'text-black hover:bg-c1 hover:text-white block px-3 py-2 rounded-md text-sm font-medium text-center'
  
  return (
    <div className='w-full p-2 grid grid-cols-1 md:grid-cols-5 items-center'>
        <div className='md:col-span-2 flex items-center '>
            <h1 className='text-3xl uppercase text-c1 tracking-wide pr-12 pl-4'>
            Pramanik
            </h1>
            <img src={logo} className="h-16 w-32"/>
        </div>
        <div className='md:col-span-3 w-full flex md:flex-col justify-between md:items-end'>
            <div className='2 flex justify-end cursor-pointer bg-gray-200 text-sm m-1'>
                {/* w-1/2 */}
                <div className='flex items-center p-1 hover:text-c1 text-black'onClick={() => setTheme(nextTheme)}>
                    <IoIosContrast size={20}/> 
                    <p className="px-1">
                        High Contrast
                    </p>
                </div>
                <div className='flex items-center  p-1' >
                    <GrLanguage size={20}/> 
                    <p className='px-1'>
                        English
                    </p>
                </div>
            </div>
            <div className=' flex justify-between'> 
            {/* w-full */}
                <div className='flex w-full items-center'>
                    <div className="hidden md:block w-full">
                        <div className=" flex items-baseline space-x-4">
                        <NavLink to="/" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle }> 
                            Home
                        </NavLink>
                        <NavLink to="/collegeList" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle }> 
                            CollegeList
                        </NavLink>
                        <NavLink to="/Thesis" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle }> 
                            Thesis
                        </NavLink>
                        {userData ? 
                        <NavLink to="/upload" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle }> 
                            Upload
                        </NavLink>
                        :null }
                        <NavLink to="/About" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle }> 
                            AboutUs
                        </NavLink>
                        </div>
                    </div>
                    </div>
                    <div className="w-full hidden md:flex space-x-2  flex-row items-center">
                        {userData ? ( <>
                                <NavLink to="/Dashboard" className={({ isActive }) => isActive ? activeLinkStyle : linkStyle }> 
                                    Dashboard
                                </NavLink>
                            <CustBtn title={"Sign out"} onClick={() => {
                            // signOut();
                            logout();
                            navigate("/"); }} 
                            // className="px-3 py-2 rounded-md text-sm font-medium bg-c1 text-white hover:text-c1 border border-c1 hover:bg-white transition ease-in-out duration-300 hover:scale-105"
                            />
                        </>
                        ) : 
                        <CustBtn title={"Login"} onClick={() => { navigate("/login");}}
                                extra={'py-2'}
                            // className="px-3 py-2 rounded-md text-sm font-medium bg-c1 text-white hover:text-c1 border border-c1 hover:bg-white transition ease-in-out duration-300 hover:scale-105"
                            />
                    }
                    </div>
                </div>
                {/* mobile icon  */}
                <div className="mr-2 flex md:hidden">
                <button onClick={() => setIsOpen(!isOpen)} type="button" className="bg-c1 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-c1 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    {!isOpen ? (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    ) : (
                    <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    )}
                </button>
                </div>
                
        </div>
            <Transition show={isOpen} enter="transition ease-out duration-100 transform" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-75 transform" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
          {/* {ref => ( */}
            <div className="md:hidden" id="mobile-menu">
             {/*removed from below div ref={ref} */}
              <div  className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <NavLink to="/" className={({ isActive }) => isActive ? activeLinkStyleMobile : linkStyleMobile }> 
                  Home
                </NavLink>

                <NavLink to="/collegeList" className={({ isActive }) => isActive ? activeLinkStyleMobile : linkStyleMobile }> 
                  College List
                </NavLink>

                <NavLink to="/Thesis" className={({ isActive }) => isActive ? activeLinkStyleMobile : linkStyleMobile }> 
                  Thesis
                </NavLink>
                {userData ? 
                <NavLink to="/upload" className={({ isActive }) => isActive ? activeLinkStyleMobile : linkStyleMobile }> 
                  Upload
                </NavLink>
                :null}

                <NavLink to="/About" className={({ isActive }) => isActive ? activeLinkStyleMobile : linkStyleMobile }> 
                  About Us
                </NavLink>
                <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                {userData ? (
                  <>
                  <NavLink to="/Dashboard" className={({ isActive }) => isActive ? activeLinkStyleMobile : linkStyleMobile }> 
                    Dashboard
                  </NavLink>
                  <CustBtn title={"Sign out"} onClick={() => {
                    //   signOut();
                      logout();
                      navigate("/");
                    }}
                    className="block px-3 py-2 text-sm font-medium rounded text-c1 border border-c1 w-full bg-white text-c1 hover:bg-c1 hover:text-white"
                    />
                  </>)
                  : 
                  <CustBtn title={"Login"} onClick={() => { navigate("/login"); }}  
                  className="block px-3 py-2 text-sm font-medium rounded border border-c1 w-full bg-white text-c1 hover:bg-c1 hover:text-white"
                  />
                }
                </div>
              </div>
            </div>
          {/* )} */}
        </Transition>
    </div>
  )
}

export default Nav