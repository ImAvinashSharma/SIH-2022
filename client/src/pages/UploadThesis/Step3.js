import React from 'react'

function Step3({inputStyle, labelStyle, formDivStyle, abstract, setAbstract, collegeName, setCollegeName, collegeId, setCollegeId}) { //universityName, setUniversityName, collegeName, setCollegeName, collegeId, setCollegeId
  return (
    <div className=''>
        {/* <div className={formDivStyle}>
            <p className={labelStyle}>University Name</p>
            <input type="text" className={inputStyle} placeholder="Enter University Name" value={universityName} onChange={e => setUniversityName(e.target.value)} />
        </div>
        <div className={formDivStyle}>
            <p className={labelStyle}>College Name</p>
            <input type="text" className={inputStyle} placeholder="Enter College Name" value={collegeName} onChange={e => setCollegeName(e.target.value)} />
        </div>
        <div className={formDivStyle}>
            <p className={labelStyle}>College Id</p>
            <input type="text" className={inputStyle} placeholder="Enter College Id" value={collegeId} onChange={e => setCollegeId(e.target.value)} />
        </div> */}
        {/* <div className='w-72'>
                <label htmlFor="role" className='text-black pb-1'>College Name</label>
                <div className="relative">
                <select className="block appearance-none w-full border text-gray-700 py-3 px-4 pr-8 rounded   leading-tight text-base" 
                    id="role" onChange={(e) => { console.log(e.target.value); setCollegeName(e.target.value)} }
                    defaultValue={collegeName}>
                    <option value="" disabled selected>Select College Name</option>
                    <option>CMR College of Engineering & Technology</option>
                    <option>CMR Institute of Technology</option>
                    <option>CMR Technical Campus</option>
                    <option>CMR Engineering College</option>
                </select>
            </div>
        </div>
        <div className='w-72'>
                <label htmlFor="role" className='text-black pb-1'>User Id</label>
                <div className="relative">
                <select className="block appearance-none w-full border text-gray-700 py-3 px-4 pr-8 rounded   leading-tight text-base" 
                    id="role" onChange={(e) => { console.log(e.target.value); setCollegeId(e.target.value)} }
                    defaultValue={collegeId}>
                    <option value="" disabled selected>Select College ID</option>
                    <option>CMRCET</option>
                    <option>CMRIT</option>
                    <option>CMRTC</option>
                    <option>CMREC</option>
                </select>
            </div>
        </div> */}
        <div className={formDivStyle}>
            <p className={labelStyle}>Abstract</p>
            <textarea rows="10" type="text" className={inputStyle} placeholder="Enter Abstract" value={abstract} onChange={e => setAbstract(e.target.value)} />
        </div> 

    </div>
  )
}

export default Step3