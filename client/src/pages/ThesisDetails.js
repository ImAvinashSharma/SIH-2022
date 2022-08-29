import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Loading from '../components/Loading';
import useAuth from '../hooks/useAuth';

function ThesisDetails() {
  const [thesisList, setThesisList] = useState([]);
  const [loading, setLoading] = useState(false)
  const [reportLink, setReportLink] = useState("null")
    const location = useLocation();
    let { id } = useParams();
    const [data, setData] = useState(location.state)
    const {userData} = useAuth();
    
    const keywords = data ? data.keywords.split(',') :null
    const upload_date = data ? new Date(data.uploded_on) : new Date()

    const cardHeadStyle = `uppercase p-1 text-c1 font-semibold text-base`
    const cardPStyle = `p-1 capitalize text-base`
    useEffect(() => {
        if(data === null){
            console.log("useEffect :")
            async function fetchCollege() {
                setLoading(true)
                axios
                  .get("http://localhost:3001/thesisList")
                  .then(function (response) {
                    setThesisList(response.data);
                    console.log(response.data)
                    response.data.map((i) => {
                        if(i.thesis_id === id ){
                            setData(i)
                            console.log("map: " + data)
                        }
                    })
                  })
                  .catch(function (error) {
                    alert("Error fetching", error);
                  })
                  .then(function () {
                    setLoading(false);
                  });
              }
              
              fetchCollege();
        }
    }, [])
    
  return (
    loading ? (
       <Loading />
    ) : (
    data ? (
    <div className='min-h-screen w-full flex flex-col items-center py-5 px-8 sm:px-16 md:px-32 lg:px-64'>
        <div className='w-full pt-8 grid grid-cols-1 sm:grid-cols-2 justify-items-center items-center'>
            <div className='flex justify-center sm:justify-start w-full'>
                <h1 className='text-3xl font-bold text-center text-c1'>
                    Thesis Details
                </h1>
            </div>
            <div className='w-full flex justify-center sm:justify-end'>
                <a href={ data.s3url} className='m-2 text-base text-white p-2 rounded bg-c1 hover:bg-white hover:text-c1 border border-c1' target={'_blank'}>View Full Thesis</a>
                {userData && userData.role==='sAdmin' && reportLink && <a href={`https://localhost:3001/getThesisReport/${id}.pdf`} download className='m-2 text-base text-white p-2 rounded bg-c1 hover:bg-white hover:text-c1 border border-c1' target={'_blank'}>Download Report</a> }
            </div>

        </div>
        <div className='mt-8 flex flex-wrap items-center justify-center text-white w-full bg-c1 p-2 rounded'>
            <h1 className='text-base px-2 font-semibold '>
                Keywords: 
            </h1>
            {keywords?.map((i, idx) => (
                <p className='py-1 px-2 text-base bg-white text-c1 rounded m-1' key={idx} > {i} </p>
            ))}
        </div>
        <div className='w-full pt-8 grid grid-cols-1 md:grid-cols-2 justify-items-center '>
            <div className='flex flex-col h-100 '>
                <div className='bg-indigo-100 flex flex-col h-full justify-evenly rounded p-5'>
                    {data.title? (
                    <div className='flex flex-wrap'>
                        <h3 className={cardHeadStyle}>
                            title :
                        </h3>
                        <p className={cardPStyle}>
                            {data.title}
                        </p>
                    </div>
                    ) : ""
                    }
                    {data.researcher? (
                    <div className='flex flex-wrap'>
                        <h3 className={cardHeadStyle}>
                        researcher :
                        </h3>
                        <p className={cardPStyle}>
                            {data.researcher}
                        </p>
                    </div>
                    ) : ""
                    }
                    {data.university? (
                    <div className='flex flex-wrap'>
                        <h3 className={cardHeadStyle}>
                        university :
                        </h3>
                        <p className={cardPStyle}>
                            {data.university}
                        </p>
                    </div>
                    ) : ""
                    }
                    {data.college? (
                    <div className='flex flex-wrap'>
                        <h3 className={cardHeadStyle}>
                            college :
                        </h3>
                        <p className={cardPStyle}>
                            {data.college}
                        </p>
                    </div>
                    ) : ""
                    }
                    {data.category? (
                    <div className='flex flex-wrap'>
                        <h3 className={cardHeadStyle}>
                            category :
                        </h3>
                        <p className={cardPStyle}>
                            {data.category}
                        </p>
                    </div>
                    ) : ""
                    }
                    {data.uploded_on? (
                    <div className='flex flex-wrap'>
                        <h3 className={cardHeadStyle}>
                        Date :
                        </h3>
                        <p className={cardPStyle}>
                            {upload_date.toUTCString()}
                        </p>
                    </div>
                    ) : ""
                    }
                    {data.vcount? (
                    <div className='flex flex-wrap'>
                        <h3 className={cardHeadStyle}>
                        vcount :
                        </h3>
                        <p className={cardPStyle}>
                            {data.vcount}
                        </p>
                    </div>
                    ) : ""
                    }
                </div>
            </div>
            <div className='flex flex-col p-5 '>
                <h1 className='text-xl text-c1 font-semibold'>
                    Abstract
                </h1>
                <p className='text-base font-normal'>
                    { data.abstract}
                </p>
            </div>
        </div>
        {/* <h1 className='pt-8 text-xl font-bold tracking-widest text-center'>
            { data.title}
        </h1> 
        <div className='pt-5 flex flex-wrap items-center justify-center'>
            <p className='text-base p-1'>
                Researcher: { data.researcher}
            </p>
            {data.guide ? 
                <p className='text-base p-1'>
                    | Guide: { data.guide}
                </p>
                : " "
            }
            {data.university ? 
                <p className='text-base p-1'>
                    | University: { data.university}
                </p>
                : " "
            }
            {data.college ? 
                <p className='text-base p-1'>
                   | College: { data.college}
                </p>
                : " "
            }
        </div>
        <div className='flex flex-wrap items-center justify-center'>
            <p className='text-sm p-1'>
                Category : {data.category}
            </p>
            <p className='text-sm p-1'>
               | Date : {upload_date.toUTCString()}
            </p>
            <p className='text-sm p-1'>
               | Views : {data.vcount}
            </p>
        </div>
        <div className='flex flex-wrap items-center'>
            {keywords?.map((i, idx) => (
                <p className='py-1 px-2 text-xs bg-c1 text-white m-2 rounded' key={idx} > {i}</p>
            ))}
        </div>
        <div className='flex flex-col'>

            <h1 className='pt-8 text-xl font-bold tracking-widest'>
                Abstract
            </h1>
            <p className='text-base'>
                { data.abstract}
            </p>
            <div className='flex justify-center p-5'>
                <a href={ data.s3url} className='text-base bg-c1 text-white p-2 rounded hover:bg-white hover:text-c1 border border-c1' target={'_blank'}>View Full Thesis</a>
            </div>
        </div> */}

    </div>) : (
        <h1 className='text-c1 text-3xl font-bold'>
            No Thesis Found
        </h1>
    )
  ))
}

export default ThesisDetails