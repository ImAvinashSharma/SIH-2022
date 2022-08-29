import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ReactHtmlParser from 'react-html-parser'
function GetHtml() {
    const [html, setHtml] = useState(null)
    useEffect(() => {
        const fetchHtml = async () => {
            await axios.post("http://localhost:3001/getHtml", {
                url: "https://sih-data.s3.ap-south-1.amazonaws.com/2243313.pdf"
            }).then(res => {
                setHtml(res.data) 
                console.log(res.data)
            }).catch(err => console.log("GetHtml, ", err))
        }
        fetchHtml()
    }, [])
  return (
    <div className='w-full flex justify-center text-center'>
        <div className='px-8 sm:px-16 md:px-32'>
            {html? ReactHtmlParser(html) : "No data"}
        </div>
        
    </div>
  )
}

export default GetHtml