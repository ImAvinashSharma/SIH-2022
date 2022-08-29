import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CustBtn from '../../components/CustBtn'
import Loading from '../../components/Loading'
import useAuth from '../../hooks/useAuth'

function Login() {
    const [loading, setLoading] = useState(false)
    const [email, setEmail ] = useState('')
    const [password, setPassword ] = useState('')
    const [err, setErr] = useState('')
    const {setUserData, getUserCollegeDetails} = useAuth()
    let navigate = useNavigate();

    const LoginBtn = async () => {
      setLoading(true)
        if(!email || !password){
            setErr("Fill All Details")
            return
        }
        setErr('')
        console.log("Login")
        await axios.post('http://localhost:3001/login', {
          user_id: email,
          password: password
        }).then( res => {
          console.log(res)
          if(res.data.message){
            setErr(res.data.message)
          }else{
            setUserData(res.data[0])
            getUserCollegeDetails(res.data[0].ref)
            navigate("/")
            
          }
        }).catch(err => {
            setErr(err.message)
        }).finally(()=> {
          setLoading(false)
        })

    }
    
  return (
    <div className='flex-grow bg-gradient-to-t from-white to-c3 flex items-center justify-center'>
      {loading ? (<Loading />) : (
      <div className='bg-white m-5  p-5 rounded w-96 flex flex-col items-center'>
        <h1 className='text-3xl font-semibold text-c1'>
          Login
        </h1>
        {err && <p className='py-4 text-red-600'>
                    {err}
                </p>
        }
          <div className='w-72'>
                <label htmlFor="email" className='text-black pb-1'>Username</label>
                <input className="w-full p-2 text-base rounded mb-3  border px-4" type="text" id="email" placeholder="Enter email" 
                    value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div className='w-72'>
                <label htmlFor="password" className='text-black pb-1'>Password</label>
                <input className="w-full p-2 text-base rounded mb-3  border px-4" type="password" id="password" placeholder="Enter password" 
                    value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <div className='w-72 pt-2'>
                <CustBtn title={"Submit"} onClick={() => LoginBtn()} extra={'w-full text-base m-0 my-2'}/>
          </div>
          <div className='mb-16 w-72 pt-2'>
              Don't have account ? 
              <Link to='/register' className='text-c1 font-bold'>
                  {" "} Register Here
              </Link>
          </div>
      </div>)
      }
    </div>
  )
}

export default Login