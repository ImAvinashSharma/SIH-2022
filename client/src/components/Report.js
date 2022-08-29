import React, { useEffect } from 'react'
import CustBtn from './CustBtn';
import DonutChart from './DonutChart'

function Report({reportData}) {
    console.log(reportData)
    var internalDValues = [];
    var internalDLabels = [];
    var externalDValues = [];
    var externalDLabels = [];
    reportData.Report.Internal.map(i => {
        internalDValues.push(Number(i.ThesisPercentage)) 
        internalDLabels.push(i.ThesisTitle)
    })
    reportData.Report.External.map(i => {
        externalDValues.push(Number(i.ThesisPercentage))
        externalDLabels.push(i.ThesisTitle)
    })
    console.log(internalDLabels)
    console.log(internalDValues)
    console.log(externalDLabels)
    console.log(externalDValues)
    const printReport = () =>{
        window.print()
    }

    const displayInternal = () => {
        return (
            <div className={cardStyle}>
                <h1 className='text-primary text-xl font-bold text-center mb-4'>OUR REPOSITORY</h1>
                {   reportData.Report.Internal.map((i, idx) => { 
                        return <div className='grid grid-cols-10 gap-8 text-gray-600' key = {idx} >
                                <p className='col-span-8 font-base text-xl'>
                                    {i.ThesisTitle}
                                </p>
                                <p className='col-span-2 font-base text-xl'>
                                    {i.ThesisPercentage}
                                </p>
                            </div>
                    })
                }
            </div>
        )
    }
    const disableExternal = () => {
        return (
            <div className={cardStyle}>
                <h1 className='text-primary text-xl font-bold text-center mb-4'>ON INTERNET</h1>
                {   reportData.Report.External.map((i, idx) => { 
                        return <div className='grid grid-cols-10 gap-8 text-gray-600' key = {idx} >
                                <p className='col-span-8 font-base text-xl'>
                                    {i.ThesisTitle}
                                </p>
                                <p className='col-span-2 font-base text-xl'>
                                    {i.ThesisPercentage}
                                </p>
                            </div>
                    })
                }
            </div>
        )
    }
    const cardStyle = 'md:col-span-2 print:col-span-2 flex flex-col justify-start items-center'
  return (
    <div className='m-5 p-5 border w-[21cm] overflow-auto relative print:border-0'> 
    {/* h-[29.7cm] */}
        <div className='absolute right-1 top-1 phide'>
            <CustBtn title={"Download"} onClick={printReport}/>
        </div>
        <div className='text-center py-16'>
            <h1  className='text-3xl font-bold text-primary '>
                PLAGIARISM ANALYSIS REPORT
            </h1>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-4 print:grid-cols-4'>
            <div className='md:col-span-2 print:col-span-2 flex print:flex-row flex-col justify-center'>
                <DonutChart dvalues={internalDValues} dlabels={internalDLabels} title={""}/>
                <div className='print:hidden md:hidden mb-16 mt-5'>
                    {displayInternal()}
                </div>
            </div>
            <div className='md:col-span-2 print:col-span-2 flex print:flex-row flex-col justify-center'>
                <DonutChart dvalues={externalDValues} dlabels={externalDLabels} title={""}/>
                <div className='print:hidden md:hidden mt-5'>
                    {disableExternal()}
                </div>
            </div>
         </div>
         <div className='hidden md:grid print:grid gap-8 md:grid-cols-4 print:grid-cols-4 mt-5'>
            {displayInternal()}
            {disableExternal()}
         </div>
         <div className='flex items-center justify-center mt-16'>
            {reportData.Status === "Accepted" ?
            <p className='text-3xl font-bold text-green-600 bg-green-200 p-2 rounded'>
                {reportData.Status}
            </p>
            : 
            <p className='text-3xl font-bold text-red-600 bg-red-200 p-2 rounded'>
                {reportData.Status}
            </p>
            }
         </div>
    </div>
  )
}

export default Report