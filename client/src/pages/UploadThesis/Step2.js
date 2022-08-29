import React from 'react'

function Step2({inputStyle, labelStyle, formDivStyle, guideName, setGuideName, keywords, setKeywords, category, setCategory}) {
  return (
    <div>
        <div className={formDivStyle}>
            <p className={labelStyle}>Guide Name</p>
            <input type="text" className={inputStyle} placeholder="Enter Guide Name" value={guideName} onChange={e => setGuideName(e.target.value)} />
        </div>
        <div className={formDivStyle}>
            <p className={labelStyle}>Keywords</p>
            <input type="text" className={inputStyle} placeholder="Enter keywords" value={keywords} onChange={e => setKeywords(e.target.value)} />
        </div>
        <div className={formDivStyle}>
            <p className={labelStyle}>Category</p>
            <input type="text" className={inputStyle} placeholder="Enter Category" value={category} onChange={e => setCategory(e.target.value)} />
        </div>
    </div>
  )
}

export default Step2