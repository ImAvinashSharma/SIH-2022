import React from 'react'
import { useLocation } from 'react-router-dom';

function SearchThesisDetails() {
    const {state} = useLocation();
    const { thesis } = state;
    const getmatchWords = () => {
        return thesis?.highlights.filter(i => i.field === "content")
    }
    // console.log("Fun: ", )
    // const matchWords = thesis?.highlights[0]?.matched_tokens
    const matchWords1 = getmatchWords().length > 0 ? getmatchWords()[0].matched_tokens[0] : []
    // console.log(matchWords1)
    const matchWords = matchWords1?.map(i => { return i.toLowerCase() })
    console.log("Match Words", matchWords)
    console.log(thesis)
  return (
    <div className='min-h-screen w-full flex flex-col items-center p-5'>
        <h1 className='text-3xl font-semibold text-c1 py-8' >
            SearchThesisDetails
        </h1>
        <div className='flex flex-col items-center p-5'>
            <h1 className='text-3xl font-semibold text-c1 py-2' >
                {thesis.document.title}
            </h1>
            <a href={ thesis.document.url} className='m-2 text-base text-white p-2 rounded bg-c1 hover:bg-white hover:text-c1 border border-c1' target={'_blank'} rel="noreferrer">View Pdf</a>
        </div>
        {/* <a className='text-gray-500' href={thesis.document.url}> {thesis.document.url} </a> */}
        <div className='w-full overflow-auto flex justify-center'>
                <p className='min-h-[29.7cm] min-w-[21cm] border p-10 text-light md:text-base'>
                    {thesis.document.content.map((txt, idx) => {
                        const arr = txt.split(" ")
                        return arr.map((i, idx1) => {
                            return (<>
                                <span className={`${matchWords.includes(i.toLowerCase())? 'bg-c1 text-white ': '' }`} key={idx+idx1}>{i}</span>
                                {" "}
                                </>)
                        })
                    })
                    }
                   
                </p>
        </div>
    </div>
  )
}

export default SearchThesisDetails