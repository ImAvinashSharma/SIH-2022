import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import useAuth from '../hooks/useAuth'
import Error404 from "../error-pages/Error404";
import About from './About'
import CollegeDetails from './CollegeDetails'
import CollegeList from './CollegeList'
import Home from './Home/Home'
import Login from './Login/Login'
import Register from './Register/Register'
import Search from './Search'
import SearchThesisDetails from './SearchThesisDetails'
import ThesisDetails from './ThesisDetails'
import ThesisList from './ThesisList'
import UploadThesis from './UploadThesis/UploadThesis'
import SuperAdminDashboard from './Dashboard/SuperAdminDashboard'
import CollegeDashboard from './Dashboard/CollegeDashboard'
import StudentDashboard from './Dashboard/StudentDashboard'
import GetHtml from '../components/GetHtml'
function Main() {
  const { userData } = useAuth();

  const role = userData ? userData.role : null

  return (
    <div className='w-full flex-grow flex'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/search" element={<Search />} />
         <Route exact path="/SearchThesisDetails" element={<SearchThesisDetails />} />
         <Route exact path="/collegeList" element={<CollegeList />} />
         <Route exact path="/Thesis" element={<ThesisList />} />
         <Route exact path="/thesis/:id" element={<ThesisDetails />} />
         <Route exact path="/about" element={<About />} />
         <Route exact path="/college/:collegeId" element={<CollegeDetails />} />
         <Route exact path="/upload" element={<UploadThesis />} />
         {userData ? (
           <>
             <Route exact path="/Dashboard" element={role === "sAdmin" ? <SuperAdminDashboard /> : role === "Res" ? <StudentDashboard /> : <CollegeDashboard />} />
           </>
         ) : null}
          <Route path="html" element={<GetHtml />} />

          <Route path="*" element={<Error404 />} />
          {/*
          <Route exact path="/Doc" element={<Doc />} />
          <Route exact path="/report" element={<ReportPage />} />
          <Route exact path="/loader" element={<Bar />} />
          <Route exact path="/loading" element={<Loading />} />
         */}
        </Routes>
    </div>
    
  )
}

export default Main