import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CustBtn from '../../components/CustBtn'
import Loading from '../../components/Loading'
import useAuth from '../../hooks/useAuth'

function Register() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail ] = useState('')
    const [unv , setUnv] = useState('')
    const [collegeId , setCollegeId] = useState('')
    const [adminName , setAdminName] = useState('')
    const [pno , setPno] = useState('')
    const [password, setPassword ] = useState('')
    const [err, setErr] = useState('')
    const[username, setUsername] = useState('')
    const[role, setRole] = useState('')
    const[sendTo, setSendTo] = useState('')
    const [name, setName] = useState('')

    const {collegeData} = useAuth();

    const RegisterBtn = async () => {
        
        console.log("Register")
        if(!role){
            setErr("Fill All Details")
            return
        }
        console.log(email + " : " + password + " : " + err  + " : " + username  + " : " + role  + " : " + sendTo)
        if(role === 'Org'){
            if(!email || !password || !username || !role || !unv || !adminName){
                setErr("Fill All Details")
                return
            }
            setErr('')
            await axios.post('http://localhost:3001/registerCollege', {
                user_id: username,
                college_id: collegeId,
                college: name,
                university: unv,
                adminName,
                username: name,
                email: email,
                password: password,
                role: role,
                pno :pno
            }).then( res => {
                console.log(res)
            })
        }else if(role === 'Res' && sendTo==="NA"){
            if(!email || !password || !username || !role || !sendTo){
                setErr("Fill All Details")
                return
            }
            setErr('')
            await axios.post('http://localhost:3001/users', {
                user_id: username,
                username: name,
                email: email,
                password: password,
                role: role,
                ref: "NULL"
            }).then( res => {
                console.log(res)
            })
        }else if(role === 'Res' ){
            if(!email || !password || !username || !role || !sendTo){
                setErr("Fill All Details")
                return
            }
            setErr('')
            await axios.post('http://localhost:3001/registerUser', {
                user_id: username,
                username: name,
                email: email,
                password: password,
                role: role,
                sendTo: sendTo,
                pno: pno
            }).then( res => {
                console.log(res)
            }).catch(err => console.log("Reg Error: ", err))
        }
    }
    const sendToList = [{ 
        'college_id': 'NA',
        'college': 'Other'
     }, ...collegeData]
    // [
    //    { id: '1', name: 'admin'},
    //    { id: '2', name: 'org'},
    //    { id: '3', name: 'college'},
    //   ];

  return (
    <div className='flex-grow bg-gradient-to-t from-white to-c3 flex items-center justify-center'>
    {loading ? (<Loading />) : (
       <div className='bg-white m-5  p-5 rounded w-96 flex flex-col items-center'>
        <h1 className='text-3xl font-semibold text-c1'>
            Register
        </h1>
            {err && <p className='py-4 text-red-600'>
                        {err}
                </p>
            }
            <div className='w-72'>
                <label htmlFor="role" className='text-black pb-1'>Account Type</label>
                <div className="relative">
                    <select className="block appearance-none w-full border text-gray-700 py-3 px-4 pr-8 rounded   leading-tight text-base" 
                        id="role" onChange={(e) => setRole(e.target.value)}>
                        <option value="" disabled selected>Select your option</option>
                        <option value="Res">Researcher</option>
                        <option value="Org">Organisation</option>
                    </select>
                </div>
            </div>
            <div className='w-72'>
                <label htmlFor="name" className='text-black pb-1'>Name</label>
                <input className="w-full p-2 text-base rounded mb-3  border   px-4" type="text" id="name" placeholder={`Enter ${role === 'Org'? 'College Name':'your Name '} `} 
                    value={name} onChange={e => setName(e.target.value)} />
            </div>
            {role === 'Org' && (
                <div className='w-72'>
                     <label htmlFor="collegeId" className='text-black pb-1'>College ID</label>
                     <input className="w-full p-2 text-base rounded mb-3  border   px-4" type="text" id="collegeId" placeholder="Enter College Id" 
                         value={collegeId} onChange={e => setCollegeId(e.target.value)} />
                 </div>     
            )}
            <div className='w-72'>
                <label htmlFor="username" className='text-black pb-1'>Username</label>
                <input className="w-full p-2 text-base rounded mb-3  border   px-4" type="text" id="username" placeholder="Enter Username" 
                    value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            {role === 'Org' && (
                <>
                <div className='w-72'>
                <label htmlFor="unv" className='text-black pb-1'>University</label>
                <input className="w-full p-2 text-base rounded mb-3  border   px-4" type="text" id="unv" placeholder="Enter University Name" 
                    value={unv} onChange={e => setUnv(e.target.value)} />
                </div>
                <div className='w-72'>
                    <label htmlFor="admName" className='text-black pb-1'>Admin Name</label>
                    <input className="w-full p-2 text-base rounded mb-3  border   px-4" type="text" id="admName" placeholder="Enter Admin Name" 
                        value={adminName} onChange={e => setAdminName(e.target.value)} />
                </div>
                </>
            )}
            <div className='w-72'>
                <label htmlFor="email" className='text-black pb-1'>Email</label>
                <input className="w-full p-2 text-base rounded mb-3  border   px-4" type="email" id="email" placeholder="Enter email" 
                    value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className='w-72'>
                <label htmlFor="pno" className='text-black pb-1'>Phone No</label>
                <input className="w-full p-2 text-base rounded mb-3  border   px-4" type="text" id="pno" placeholder="Enter Phone Number ex: +91 **** *** ***" 
                    value={pno} onChange={e => setPno(e.target.value)} />
            </div>
            <div className='w-72'>
                <label htmlFor="password" className='text-black pb-1'>Password</label>
                <input className="w-full p-2 text-base rounded mb-3  border   px-4" type="password" id="password" placeholder="Enter password" 
                    value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            
            {role === "Res" && (
                <div className='w-72 pt-2'>
                    <label htmlFor="sendto" className='text-black pb-1'>Send To</label>
                    <div className="relative">
                        <select className="block appearance-none w-full border text-gray-700 py-3 px-4 pr-8 rounded   leading-tight text-base" 
                            id="sendto" onChange={(e) => setSendTo(e.target.value)} >
                                <option value="" disabled selected>Select your option</option>
                                {sendToList.map((i, idx) => (
                                    <option key={idx} value={i.college_id}>{i.college_id} - {i.college}</option>
                                ))}
                        </select>
                    </div>
                </div>
            )}
            <div className='w-72 pt-2'>
                <CustBtn title={"Submit"} onClick={() => RegisterBtn()} extra={'w-full text-base m-0 my-2'}/>
            </div>
            <div className='mb-16 w-72 pt-2'>
                Already have account ? 
                <Link to='/login' className='text-c1 font-bold'>
                   {" "} Login Here
                </Link>
            </div>
        </div>
    )}
    </div>
  )
}

export default Register