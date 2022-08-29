import React from 'react'

function CustBtn({onClick, title, className, extra}) {
  return (
    <button type="submit" onClick={onClick} className={className? className : `m-2 p-3 bg-c1 bg-gradient-to-br from-c1 to-c2 text-white hover:from-c2 hover:to-c1 border hover:border-c1  rounded transition ease-in-out duration-300 hover:scale-105 ${extra} `}>
                {title}
    </button>
  )
}

export default CustBtn