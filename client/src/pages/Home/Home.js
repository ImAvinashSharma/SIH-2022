import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BsSearch } from "react-icons/bs";
import Slider from '../../components/Slider';
import CustBtn from '../../components/CustBtn';
import { BiUserCircle } from "react-icons/bi";
import { FaNewspaper, FaUniversity } from "react-icons/fa";
import Top10Colleges from '../Top10Colleges';
import LineChart from '../../components/LineChart';
import RadialBarChart from '../../components/RadialBarChart';
import axios from 'axios';
function Home() {
  const [search, setSearch] = useState();
  const [thesisCount, setThesisCount] = useState(null);
  const [orgCount, setOrgCount] = useState(null);
  const [resCount, setResCount] = useState(null);
  const images=[
    { url: "https://sih-data.s3.ap-south-1.amazonaws.com/image/drugs%20used%20in%20unai.jpeg" },
    { url: "https://sih-data.s3.ap-south-1.amazonaws.com/image/Homeopathy.jpeg" },
    { url: "https://sih-data.s3.ap-south-1.amazonaws.com/image/modi(yoga).webp" },
    { url: "https://sih-data.s3.ap-south-1.amazonaws.com/image/siddha.webp" },
]
  const navigate = useNavigate();
  const cardDivStyle = `p-5 bg-c1 flex flex-col rounded items-center justify-center text-white hover:bg-white hover:text-c1 border border-c1 transition ease-in-out duration-300 hover:scale-105`
  const cardHeadStyle = 'hidden p-2 text-base font-semibold '
  const cardPStyle = `text-3xl flex items-center p-2`
  const cardIconStyle = `p-2 rounded-full bg-white text-c1`
  
  const processCardStyle = `text-black h-full w-full bg-white p-5  text-center flex flex-col items-center  rounded border border-b-2 border-b-green-400 `
  const processCardNo = '-translate-y-8 rounded-full bg-white px-3 py-1 border border-c1 border-2'
  const processCardText = `pt-5 `
  const processIcon = `h-16 rounded  `

  useEffect(() => {
    const getResCount = async() => {
      await axios
        .get(`http://localhost:3001/userCount`)
        .then(function (response) {
          setResCount(response.data);
          console.log("Total Res Count: ", response.data)

        })
        .catch(function (error) {
          alert("Error fetching Total College ", error);
        })
      }
      const getThesisCount = async() => {
        await axios
          .get(`http://localhost:3001/thesisCount`)
          .then(function (response) {
            console.log("Total Thesis Count: ", response.data)
            setThesisCount(response.data);
          })
          .catch(function (error) {
            alert("Error fetching Total Thesis ", error);
          })
        }
      const getOrgCount = async() => {
        await axios
          .get(`http://localhost:3001/collegeCount`)
          .then(function (response) {
            setOrgCount(response.data);
            console.log("Total Org Count: ", response.data)

          })
          .catch(function (error) {
            alert("Error fetching Total Thesis ", error);
          })
        }
        getResCount()
      getThesisCount()
      getOrgCount()
  }, [])



  return (
    <div className='w-full flex-grow text-black dark:bg-black  dark:text-white '>
        {/* Search Start  */}
        <div className='bg-gradient-to-br from-c1   to-c2 flex justify-center'>
            <div className='m-5 bg-white rounded flex'>
                <input type="text" value={search} placeholder="Search Theses" onChange={e => setSearch(e.target.value)}
                    onKeyPress={(e) => {
                        if(e.key === 'Enter'){
                            navigate('/search', { state: { searchText: search} })
                          }
                    } }
                 className='w-40 sm:w-64 md:w-96  p-2 rounded focus:outline-none' />
                <span className="p-2 bg-gray-100 rounded" onClick={() => navigate('/search', { state: { searchText: search} })} >
                    <BsSearch size={22} />
                </span>
            </div>
        </div>
        {/* Search End  */}

        {/* slider section*/}
        <div className='w-full flex flex-col md:flex-row flex-col-reverse'>
          <div className='w-full md:w-1/2 flex flex-col items-center justify-center'>
            <h1 className='text-4xl text-center px-5 pb-2 font-semibold text-tc1 dark:text-c1'>
              Introducing to Thesis Repository
            </h1>
            <p className=''>
              Say no to plagiarism, say yes to originality.
            </p>
            <CustBtn title={"Get started"} extra={"px-4"}/>
          </div>
          <div className='w-fill md:w-1/2 p-5 flex justify-center' >
            <Slider images={images}/>
          </div>
        </div>

        {/* cards start */}
        <div className='py-5 w-full flex grid grid-cols-1 md:grid-cols-3 gap-8 px-8 sm:px-16 md:px-32 place-items-center'>
          <div className={cardDivStyle} >
                    <div className={cardHeadStyle}>
                      Colleges 
                    </div>
                    <div className={cardPStyle}>
                      <p className='px-2'>
                        {orgCount? orgCount[0]?.count : '0'}
                      </p>
                      <div className={cardIconStyle}>
                        <FaUniversity size={35}/>
                      </div>
                    </div>
          </div>
          <div className={cardDivStyle} >
                    <div className={cardHeadStyle}>
                      Researchers 
                    </div>
                    <div className={cardPStyle}>
                      <p className='px-2'>
                      {resCount? resCount[0]?.count : '0'}

                      </p>
                      <div className={cardIconStyle}>
                        <BiUserCircle size={35} />
                      </div>
                    </div>
          </div>
          <div className={cardDivStyle} >
                    <div className={cardHeadStyle}>
                      Thesis 
                    </div>
                    <div className={cardPStyle}>
                      <p className='px-2'>
                      {thesisCount? thesisCount[0]?.count : '0'}

                      </p>
                      <div className={cardIconStyle}>
                        <FaNewspaper size={35} />
                      </div>
                    </div>
          </div>

        </div>
        {/* cards end */}

        {/* graphs start*/}
        
        {/* <div className='h-64 grid grid-cols-1 grid-cols-2 gap-8  px-8 sm:px-16 md:px-32 place-items-center'>
          <div className='bg-blue-100'>
            Line graph
          </div>
          <div className='bg-blue-100'>
            Pie Chart
          </div>
        </div> */}


        <div className='grid grid-cols-1 sm:grid-cols-2 p-5 place-items-center'>
            <div className=''>
                <LineChart dvalues={[50,35,80,90,34,56,7,3,10,56,76,12]} xcategories={['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} title={"Thesis Submitted"}/> 
            </div>
            <div className=''>
                <RadialBarChart dvalues={[100, 255, 41, 17, 15]} dlabels={["A", "B", "C", "D", "E"]} title={"Thesis Chart"}/>
            </div>
            
        </div>

        {/* graphs end  */}
        

        {/* process start */}
        <div className='w-full mt-10 text-center text-3xl dark:text-c1'>
                How it Works
        </div>
          <div className='relative mt-5 py-10 flex grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-8  px-8 sm:px-16 md:px-32 place-items-center'>  
            <div className={processCardStyle}>
              <div className={processCardNo}>
                1
              </div>
              <img src={"https://sih-data.s3.ap-south-1.amazonaws.com/image/process1.png"} className={processIcon}/>
              <p className={processCardText}>
                Sign up/ Sign in
              </p>
            </div>

            <div className={processCardStyle}>
              <div className={processCardNo}>
                2
              </div>
              <img src={"https://sih-data.s3.ap-south-1.amazonaws.com/image/process2.png"} className={processIcon}/>
              <p className={processCardText}>
                Go to Upload and <br /> Enter your Details
              </p>
            </div>

            <div className={processCardStyle}>
              <div className={processCardNo}>
                3
              </div>
              <img src={"https://sih-data.s3.ap-south-1.amazonaws.com/image/process3.png"} className={processIcon}/>
              <p className={processCardText}>
                Upload your Thesis and check Plagiarism
              </p>
            </div>

            <div className={processCardStyle}>
              <div className={processCardNo}>
                4
              </div>
              <img src={"https://sih-data.s3.ap-south-1.amazonaws.com/image/process4.png"} className={processIcon}/>
              <p className={processCardText}>
                Get Accepted and you are ready to go!
              </p>
            </div>

          </div>
        {/* process end  */}

        <div className='w-full flex flex-col justify-center py-5 px-8 sm:px-16 md:px-32 '>
          <h1 className='text-3xl dark:text-c1 pb-8 text-center'>
            Top 10 Colleges
          </h1>
          <Top10Colleges />
        </div>


    </div>
  )
}

export default Home