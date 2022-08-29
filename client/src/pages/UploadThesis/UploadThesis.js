import React, { useEffect, useState } from 'react'
import CustBtn from '../../components/CustBtn';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import { AiOutlineFileText, AiOutlineUpload } from "react-icons/ai";
import Pdf_viewer from '../../components/Pdf_viewer';
import axios from "axios";
import Loading from '../../components/Loading';
import shortid from "shortid";
import useAuth from '../../hooks/useAuth';

function UploadThesis() {
  // console.log(shortid.generate())
  const {userData, userCollegeData, getUserCollegeDetails} = useAuth();
  useEffect(() => {
    getUserCollegeDetails();
  },[])
  const [step, setStep] = useState(1)
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [fileUrl, setFileUrl]=useState(null);

  const [thesisId, setThesisId] = useState("");
  const [userId, setUserId] = useState("");
  const [thesisTitle, setThesisTitle] = useState("");
  const [researcherName, setResearcherName] = useState("");
  const [completed_at, setCompleted_at] = useState("");

  const [guideName, setGuideName] = useState("");
  const [keywords, setKeywords] = useState("");
  const [category, setCategory] = useState("");
  
  const [abstract, setAbstract] = useState("");
  
  const [universityName, setUniversityName] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [collegeId, setCollegeId] = useState("");
  
  const [url, setUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const API_ENDPOINT = "https://6hz0tqwiza.execute-api.ap-south-1.amazonaws.com/default/getPreSignedUrl";
  const s3Url = "https://sih-data.s3.ap-south-1.amazonaws.com/";

  const btnStyle = 'm-1 p-2 text-base bg-c1 disabled:bg-white  text-white disabled:text-gray-400 hover:bg-white border enabled:hover:border-c1 hover:text-c1 rounded transition ease-in-out duration-300 enabled:hover:-translate-y-1'
  const inputStyle = "w-full p-2 text-base m-1 rounded   border";
  const labelStyle = "m-1 font-medium text-base ";
  const formDivStyle = " mb-2 text-md flex flex-col";

  const changeHandler = event => {
    if(event.target.files.length > 0){
      setSelectedFile(event.target.files[0]);
      setIsSelected(true);
      let u = window.URL.createObjectURL(event.target.files[0])
      console.log(u)
      setFileUrl(u)
    }else{
      setIsSelected(false)
    }
  };
  const submitHandler = async (turl) => {
    setLoading(true);
    console.log("Turl: ", turl);
    let uname = ''
    let cname= ''
    let cid =''
    if(userCollegeData){
      uname = userCollegeData.university ? userCollegeData.university : "null"
      cid = userCollegeData.college_id ? userCollegeData.college_id : "null"
      cname = userCollegeData.college ? userCollegeData.college : "null"
    }

    await axios.post("http://localhost:3001/uploadThesis", {
      thesis_id: shortid.generate(),
      user_id: userData.user_id,
      researcher: researcherName,
      guide: guideName,
      title: thesisTitle, keywords, 
      university: uname, 
      college_id: cid,
      college: cname,
      abstract, category, vCount: 0, created_on: completed_at , s3Url : s3Url + turl
    }).then(async (res) => {
      console.log("Uploaded to DB")
      setLoading(false);

      const formData = new FormData();
      formData.append('name', researcherName );
      formData.append('title', thesisTitle);
      formData.append('assignment_id', '99263' );
      formData.append('file', selectedFile);
      await axios.get('http://localhost:3001/jwt').then( async (res) => {
        console.log("JWT: ", res)
        await axios.post("https://www.drillbitplagiarismcheck.com/drillbit_new/api/submission",
        { headers: {
          "Content-Type": "multipart/form-data",
          "Accept": "application/json",
          "type": "formData",  
          "Authorization" : `Bearer ${res}`
        }, formData } ).then(res1 => {
          console.log("Paper Id: ", res1.paper_id)
        }).catch(err => console.log("Drill Bit ulpoad Error: ", err))
      }).catch(err => console.log("JWT Error: ", err))
      
      // await axios.post("http://localhost:3001/uplodeFileForPlagCheck").then((res1)=>{
      //   console.log("Uploaded to DRILLBIT")
      // }).catch(err=>{
      //   console.log("DrillBit Error: ", err)
      // })

    }).catch(err => {
      console.log("Thesis Insert Error: ", err)
    })
    // .finally(() => {
    //   setLoading(false);
    // });
    // await axios.post("http://localhost:3001/uploadThesis", {
    //   thesis_id: shortid.generate(),
    //   user_id: userData.user_id,
    //   researcher: researcherName,
    //   guide: guideName,
    //   title: thesisTitle, keywords, 
    //   university: userCollegeData?.university ? userCollegeData.university : null, 
    //   college_id: userCollegeData?.college_id ? userCollegeData.college_id : null,
    //   college: userCollegeData?.college ? userCollegeData.college : null,
    //   abstract, category, vCount: 0, created_on: completed_at , s3Url : s3Url + turl
    // })
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // * GET request: presigned URL
      const response = await axios({
        method: "GET",
        url: API_ENDPOINT
      }).then(async(res) =>{
        console.log("presigned URl res:", res);
        setUrl(res["data"]["Key"]);
        submitHandler(res["data"]["Key"]);
        // * PUT request: upload file to S3
        const result = await fetch(res.data.uploadURL, {
          method: "PUT",
          body: selectedFile
        });
        console.log("Uploaded to s3 Result: ", result);
        if (result.status !== 200) new Error("Upload failed");
        })
      .catch(err => {
        console.log("Error : ", err)
      });

      // // console.log("Response: ", response);
      // if (response.status !== 200) new Error("Upload failed");

    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  const prevStep = () => {
    if(step > 1){
      setStep(step-1)
    }
  }
  const nextStep = () => {
    if(step < 3){
      setStep(step+1)
    }else if(step === 3){
      if( !thesisTitle || !researcherName || !completed_at){ //userId
        setStep(1)
        alert("Fill All details")
      }else if (!guideName || !category || !keywords){
        setStep(2)
        alert("Fill All details")
      }else if( !abstract ){ //|| !collegeId || !collegeId || !collegeName
        alert("Fill All details")
      }else if (!selectedFile){
        alert("Upload File")
      }else{
        handleSubmit()
      }
    }
  }
  const form = () => {
    switch (step) {
      case 1: 
        return (
          <Step1 inputStyle={inputStyle} labelStyle={labelStyle} formDivStyle={formDivStyle}
          userId={userId} setUserId={setUserId} 
            thesisTitle={thesisTitle} setThesisTitle={setThesisTitle} 
            researcherName={researcherName} setResearcherName={setResearcherName}
            completed_at={completed_at} setCompleted_at={setCompleted_at}/>
        )
      case 2:
        return (
          <Step2 inputStyle={inputStyle} labelStyle={labelStyle} formDivStyle={formDivStyle}
            guideName={guideName} setGuideName={setGuideName}
            keywords={keywords} setKeywords={setKeywords}
            category={category} setCategory={setCategory}
                  />
        ) 
      case 3 : return(
          <Step3  inputStyle={inputStyle} labelStyle={labelStyle} formDivStyle={formDivStyle}
            // universityName={universityName} setUniversityName={setUniversityName}
            collegeName={collegeName} setCollegeName={setCollegeName}
            collegeId={collegeId} setCollegeId={setCollegeId}
            abstract={abstract} setAbstract={setAbstract} 
                />

      )
      default: return (<div> </div>)
    }
  }


  const stepdivStyle = 'flex items-center'
  const stepdiv3Style = "flex w-16 bg-gray-200 h-0.5 "
  // dark:bg-gray-700"
  
  const stepsTrack = () => {
    return [1,2,3].map((i, idx) => {
      return (
        <div  className={stepdivStyle} key={idx}>
            <div  className={`flex z-10 justify-center items-center w-6 h-6 ${step >= i ? 'bg-c1 text-white': 'bg-blue-200'} rounded-full ring-0 ring-white  shrink-0`}>
            {/* dark:bg-blue-900 sm:ring-8 dark:ring-gray-900 */}
                {i}
            </div>
            {i !== 3 && <div  className={stepdiv3Style}></div> }
        </div>
      )
    })
  }

  const uploadFile = () => {
    return (
      <div className=''>
        <div className={`mt-2 rounded flex
          justify-center transition ease-in-out duration-300 hover:-translate-y-2 hover:scale-105`} >
          <input type="file" name="file" id="upload" className="hidden" onChange={changeHandler} />
          <label htmlFor="upload" className='bg-c1 w-full rounded flex justify-center p-4'>{isSelected ? <AiOutlineFileText size={50} color="white" /> : <AiOutlineUpload size={50} color="white" />}</label>
        </div>
        {!isSelected && <p className='text-center text-base py-2 font-bold'>Upload file</p>}
        <div className="md:col-span-2 flex justify-center">
            {isSelected && (
              <>
              <div className="text-md grid grid-cols-2 mt-5">
                <p className={labelStyle}>File Name: </p>
                <p className="m-2 text-sm">{selectedFile?.name}</p>
                <p className={labelStyle}>File Type: </p>
                <p className="m-2 text-sm">{selectedFile?.type}</p>
                <p className={labelStyle}>Size in bytes: </p>
                <p className="m-2 text-sm">{selectedFile?.size}</p>
                <p className={labelStyle}>Last Modified Date: </p>
                <p className="m-2 text-sm">{selectedFile?.lastModifiedDate.toLocaleDateString()}</p>
              </div>
              <Pdf_viewer selectedFile={fileUrl} className={"h-64 w-64 p-2 "}/>
              </>
            )}
          </div>
      </div>
    )
  }
  
  return (
    <div className='w-full  p-5 md:p-8 '>
        {!url ? (
          <>
          <h1 className='text-3xl font-bold text-c1 text-center'>Upload Thesis</h1>
          {!loading ? (
          <div className='py-5 grid grid-cols-1 md:grid-cols-2 '>
              <div className='p-5 flex flex-col items-center justify-center'>
                  {uploadFile()}
              </div>

              <div className='bg-white p-5 h-[35rem] flex flex-col' >
                  <div className='py-5 my-3 flex items-center justify-center'>
                    {stepsTrack()}
                  </div>
                  <div className='flex-grow'>
                    {form()}
                  </div>
                  <div className='flex justify-between'>
                    <button className={` ${btnStyle} `} disabled={step === 1} onClick={prevStep} >Prev</button>
                    <button className={` ${btnStyle} `} onClick={nextStep} >{step === 3 ? 'Submit' : 'Next' }</button>
                  </div>
              </div>
          </div> ) : (
            <Loading />
          )}
          </>
        ) : (
          <div className="text-center text-c1 ">
            <h1 className="text-3xl font-bold p-2">Thesis Uploaded </h1>
            <a target="_blank" href={s3Url + url} rel="noreferrer" className="text-xl underline text-blue-600 hover:text-blue-800">
              Click Here To View
            </a>
          </div>
        )
        }
    </div>
  )
}

export default UploadThesis