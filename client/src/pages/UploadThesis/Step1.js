import React from 'react'

function Step1({inputStyle, labelStyle, formDivStyle, userId, setUserId, thesisTitle ,setThesisTitle, researcherName, setResearcherName, completed_at, setCompleted_at}) {

    return (
    <div className=''>
        {/* <div className='w-72'>
                <label htmlFor="role" className='text-black pb-1'>User Id</label>
                <div className="relative">
                <select className="block appearance-none w-full border text-gray-700 py-3 px-4 pr-8 rounded   leading-tight text-base" 
                    id="role" onChange={(e) => { console.log(e.target.value); setUserId(e.target.value)} }
                    defaultValue={userId}>
                    <option value="" disabled selected>Select User id</option>
                    <option>Pranay</option>
                    <option>Bhuvana</option>
                    <option>seethala</option>
                    <option>Prav</option>
                    <option>avi</option>
                    <option>pari</option>
                </select>
            </div>
        </div> */}
        <div className={formDivStyle}>
            <p className={labelStyle}>Thesis Title</p>
            <input type="text" className={inputStyle} placeholder="Enter Thesis Title" value={thesisTitle} onChange={e => setThesisTitle(e.target.value)} />
        </div>
        <div className={formDivStyle}>
            <p className={labelStyle}>Researcher Name</p>
            <input type="text" className={inputStyle} placeholder="Enter Researcher Name" value={researcherName} onChange={e => setResearcherName(e.target.value)} />
        </div>
        <div className={formDivStyle}>
            <p className={labelStyle}>Completed At</p>
            <input type="date" className={inputStyle} placeholder="Enter Completed Date" value={completed_at} onChange={e => setCompleted_at(e.target.value)} />
        </div>
    </div>
  )
}

export default Step1