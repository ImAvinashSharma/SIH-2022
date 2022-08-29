import React from 'react'
import { Link } from 'react-router-dom'
function LinkBtn({url , title, state}) {
  return (
    <Link to={url} state={state} className="bg-c1 hover:bg-white border hover:border-c1 
    hover:text-c1 text-white p-2 rounded transition ease-in-out duration-300 hover:scale-105">
        {title}
    </Link>
  )
}

export default LinkBtn