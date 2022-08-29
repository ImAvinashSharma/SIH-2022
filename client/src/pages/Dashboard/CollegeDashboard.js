import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import PieChart from "../../components/PieChart";
import LineChart from "../../components/LineChart";
import axios from "axios";
import Profile from '../../components/Dashboard/Profile'
import CollegeReqs from '../../components/Dashboard/CollegeReqs'
import ResearchersReqs from '../../components/Dashboard/ResearchersReqs'
import Researchers from '../../components/Dashboard/Researchers'

function CollegeDashboard() {
  const { userData } = useAuth();
  const [thesisCount, setThesisCount] = useState([])
  const [researchersCount, setResearchersCount] = useState([])
  const [todaythesisCount, setTodayThesisCount] = useState([])

  useEffect(() => {
    const getResearchersCount = async() => {
    await axios
      .get(`http://localhost:3001/getReaCountByCollegeId/${userData.ref}`)
      .then(function (response) {
        console.log("getReaCountByCollegeId: ", response.data)
        setResearchersCount(response.data);
      })
      .catch(function (error) {
        alert("Error getRecCountByCollegeId ", error);
      })
    }
    const getThesisCount = async() => {
      await axios
        .get(`http://localhost:3001/getThesisCountByCollegeId/${userData.ref}`)
        .then(function (response) {
          console.log("getThesisCountByCollegeId: ", response.data)
          setThesisCount(response.data);
        })
        .catch(function (error) {
          alert("Error getThesisCountByCollegeId ", error);
        })
      }
      const getTodayThesisCount = async() => {
        await axios
          .get(`http://localhost:3001/getTodayNoOfThesisByCollageId/${userData.ref}`)
          .then(function (response) {
            console.log("getTodayNoOfThesisByCollageId: ", response.data)
            setTodayThesisCount(response.data);
          })
          .catch(function (error) {
            alert("Error getTodayNoOfThesisByCollageId ", error);
          })
        }
    getResearchersCount()
    getThesisCount()
    getTodayThesisCount()
  }, [])
  const cardStyle = "bg-c1 flex flex-col items-center justify-center text-white  p-3 h-48 w-48 hover:bg-white border hover:border-c1 hover:text-c1 rounded transition ease-in-out duration-300 hover:scale-105"
  const tabs = ['Profile', 'Researchers Requests', 'Researchers']
  const [currTab, setCurrTab] = useState(0)

  const tabView = () => {
    switch (currTab) {
      case 0: return (<Profile />)
      case 1: return <ResearchersReqs />
      case 2: return <Researchers />
      default: return ( <Profile />)
    }
  }
  return (
    <>
      <div className="bg-white  flex flex-col items-center w-full">
        <div className="w-full shadow mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900"> College Admin Dashboard</h1>
        </div>
        <div className="mt-5 p-4">
          <Link to="/Doc">Document</Link>
          <p className="text-3xl">{userData[0]?.userName}</p>
          <p className="text-3xl">{userData[0]?.email}</p>
          <p className="text-3xl">{userData[0]?.thesis}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-5 w-full ">
            <div className="md:col-start-2 flex items-center justify-center">
              <div className={cardStyle}>
                <h1 className="text-center text-xl uppercase">
                  Total Thesis Submitted
                </h1>
                <p className="text-3xl pt-3 font-bold">
                {thesisCount?.count }
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className={cardStyle}>
                <h1 className=" text-center text-xl uppercase">
                  Total <br/>Researchers
                </h1>
                <p className="text-3xl pt-3 font-bold">
                  {researchersCount?.count }
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className={cardStyle}>
                <h1 className="text-center text-xl uppercase">
                Thesis Submitted Today 
                </h1>
                <p className="text-3xl pt-3 font-bold">
                  {todaythesisCount?.count}
                </p>
              </div>
            </div>
        </div>

        {/* char 
        <LineChart dvalues={[50,35,80,90,34,56,7,3,10,56,76,12]} xcategories={['Jan', "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]} title={"Thesis Submitted Last one year"}/> */}
        <div className="w-full flex flex-col items-center ">
          <div className="flex justify-center flex-wrap">
            {tabs.map((i,idx) => {
              return (
                <p key={idx} className={`p-1 m-2 text-base cursor-pointer ${idx === currTab ? ' underline underline-offset-8 decoration-4 decoration-c1 ': ' '}`} onClick={() => setCurrTab(idx)}>{i}</p>
              )
            })}
          </div>
          <div className="w-full pt-5 p-5 flex justify-center border">
            {tabView()}
          </div>
        </div>
        
      </div>
    </>
  );
}


export default CollegeDashboard;
