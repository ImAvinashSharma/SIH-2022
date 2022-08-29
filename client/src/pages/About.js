import React from "react";
import Avinash from '../assets/Avinash.png'
import Praveen from '../assets/Praveen.png'
import Pranay from '../assets/Pranay.png'
import Bhuvana from '../assets/Bhuvana.png'
import Parinitha from '../assets/Parinitha.png'
import Seethala from '../assets/Seethala.png'

function About() {
  const imgStyle = `inline object-cover w-32 h-32 object-top rounded-full `
  const crewStyle = `flex flex-col flex-wrap items-center justify-center`
  const cardHStyle = `pt-3 font-semibold text-2xl text-c1`
  const cardPStyle = `pt-1 text-sm text-gray-500`
  return (
    <div className="bg-white flex flex-col items-center "> 
    {/* shadow */}
     
      {/* <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
      </div> */}
      <div className="text-5xl font-bold text-c1 pt-5">
        About us
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-6 mt-5">
        <div className="md:col-start-2 col-span-2 flex items-center justify-center">
          <img src={require('../assets/about.png')} className="w-64" />
        </div>
        <div className="flex items-center justify-center col-span-2">
          <p className="text-xl p-5 md:px-8 ">
          At PRAMANIK we let the users validate their thesis with a built-in plagiarism checker with nlp-library that identifies various regional languages and thus enables easy uploads.
          <br /><span className="text-xl font-semibold text-c1">
            Our mission <br/>
          </span>

Building an authentic medical thesis repository, that is scalable and serves a wide spectrum of audience.


          </p>
        </div>
        <div className="md:col-start-2 col-span-2 p-5 mt-5">
          <h1 className="text-3xl text-c1 font-semibold">
          Our Approch
          </h1>
          <p className="text-xl pt-5 font-base">
          We have used NLP Libraries to translate various native languages like Hindi, Sanskrit, Telugu, etc into English and perform plagiarism check on the thesis with a built-in standard plagiarism checker. After passing the plagiarism check the user can easily upload their thesis to the repository. This helps us make a functional medical thesis repository.
          </p>
        </div>
        <div className="p-5 col-span-2 mt-5">
          <h1 className="text-3xl text-c1 font-semibold">
          Our features
          </h1>
          <p className="text-xl pt-5 font-base flex flex-col">
            <p className="">● Faster Search Engine</p>
            <p className="">● Accuracy Rate</p>
            <p className="">● Easy Navigation / User friendly</p>
            <p className="">● Regional language / Plagiarism detection</p>
          </p>
        </div>
      </div>
      <div className="pb-8">
        <div className="text-3xl font-semibold text-c1 pt-5 text-center pb-8">
            Meet The Crew
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-5">
          <div className={crewStyle}>
            <img src={Avinash} className={imgStyle} />
            <h1 className={cardHStyle}>Avinash Sharma</h1>
            <p className={cardPStyle}>Team leader | Back-end Developer </p>
          </div>
          <div className={crewStyle}>
            <img src={Praveen} className={imgStyle} />
            <h1 className={cardHStyle}>Praveen</h1>
            <p className={cardPStyle}>Python Developer </p>
          </div>
          <div className={crewStyle}>
            <img src={Pranay} className={imgStyle} />
            <h1 className={cardHStyle}>Pranay Kumar</h1>
            <p className={cardPStyle}>Front-end Developer </p>
          </div>
          <div className={crewStyle}>
            <img src={Bhuvana} className={imgStyle} />
            <h1 className={cardHStyle}>Bhuvana Sri</h1>
            <p className={cardPStyle}>DevOps Developer | Operations  </p>
          </div>
          <div className={crewStyle}>
            <img className={imgStyle} src={Parinitha} />
            <h1 className={cardHStyle}>Parinitha</h1>
            <p className={cardPStyle}>Back-end Developer | Head of Operations</p>
          </div>
          <div className={crewStyle}>
            <img src={Seethala} className={imgStyle} />
            <h1 className={cardHStyle}>Seethala</h1>
            <p className={cardPStyle}> UI/UX Designer </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
