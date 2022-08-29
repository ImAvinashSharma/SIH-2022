import { Transition } from '@headlessui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'
import { BsSearch } from 'react-icons/bs'
import { useLocation } from 'react-router-dom'
import CustBtn from '../components/CustBtn'
import { useNavigate } from 'react-router-dom';

function Search() {
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [showSug, setShowSug] = useState(false)
    const [sug, setSug] = useState([])
    const navigate = useNavigate();
    const [checked, setChecked] = useState(['content']);
    const checkList = ["title", "researcherName", "keywords", "category"];

    const [res, setRes] = useState([
        // { title: "Thesis 1", 
        //     des: "description 1 Centres of Excellence (CoE) defining a common set of best practices and work standards. CoEs may be described as organisational environments that attempt for and achieve something in developing high standards of conduct in a field of research, innovation or learning. They are often highly attractive to research and development (R&D) investments and talent in their field. Therefore they possess the ability to absorb and generate new knowledge. Ideally they would distribute and utilize this new knowledge in the form of new capacity in their field, be it research results, innovations or talent.            CoEs are typically geographically concentrated and focused on high potential/growth areas in science and industry, but they may also be virtual/distributed and consist of a network of co-operative partners with a co-ordinating centre.", 
        //     link: "https://www.google.com/" }, 
        // { title: "Thesis 1", des: "description 1", link: "https://www.google.com/" }, 
        // { title: "Thesis 1 - Thesis 1 - Thesis 1", des: "description 1", link: "https://www.google.com/" }, 
        // { title: "Thesis 1", des: "description 1", link: "https://www.google.com/" }, 
        // { title: "Thesis 1", des: "description 1", link: "https://www.google.com/" }, 
        // { title: "Thesis 1", des: "description 1", link: "https://www.google.com/" }, 
        // { title: "Thesis 1", des: "description 1", link: "https://www.google.com/" }, 
        // { title: "Thesis 1", des: "description 1", link: "https://www.google.com/" }, 
    ])
    const {state} = useLocation();
    const { searchText } = state;
    const searchFun = async (searchinp) => {
        if(searchinp){
            setLoading(true)
            await axios
            .post("http://localhost:3001/search", { query: searchinp, category: checked })
            .then(function (response) {
                console.log(response.data)
                setRes(response.data.data)
            })
            .catch(function (error) {
                alert("Error fetching", error);
            })
            .then(function () {
                setLoading(false);
            });
        }
    }
    useEffect(() => {
        if(searchText){
            setSearch(searchText)
            searchFun(searchText)
        }
    }, [searchText])
    // console.log("res : ", res);

    
    const handleCheck = (event) => {
        var updatedList = [...checked];
        console.log("updatedList: ", updatedList)
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        setChecked(updatedList);
      };

      var isChecked = (item) => checked.includes(item) ? "text-c1 px-2 capitalize" : "text-black px-2 capitalize ";

  return (
    <div className='w-full relative'>
        <div className='  top-0 bg-c1 p-5 md:p-10  flex flex-col items-center justify-center text-base'>
            <div className="relative w-full sm:w-64 md:w-1/2 "> 
                <div className="absolute top-4 left-3">
                   <AiOutlineSearch size={23} />
                </div>
                <input type="text" className="h-14 w-full pl-10 pr-24 rounded-lg z-0 focus:shadow focus:outline-none" 
                placeholder="Search anything..." value={search} onChange={e => setSearch(e.target.value)} />
                <div className="absolute top-2 right-2">    
                    <button className="h-10 w-20 text-white rounded-lg bg-c1 hover:bg-white hover:border hover:border-c1 hover:text-c1"
                        onClick={() => searchFun(search)}>
                        Search
                    </button>        
                </div>
            </div>
                <div className={`${showSug? "bg-gray-100 p-2 w-full sm:w-64 md:w-1/2 -mt-5 pt-5 rounded" :"hidden"}`}>
                    <Transition show={showSug} enter="transition ease-out duration-100 transform" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-75 transform" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">   
                    {sug.map((i,idx) => {
                        return (<div className=' p-2 flex hover:bg-white rounded transition ease-in-out duration-300 hover:scale-105' 
                            onClick={() => {
                                setSearch(sug[idx])
                            }}>
                            <span className='pr-2'>
                                <AiOutlineSearch size={23} /> 
                            </span>
                            <p className=''>
                                {i}
                            </p>
                        </div>)
                    })}
                    </Transition>
                </div>
        </div>
        <div className='p-5 flex flex-col items-center justify-center relative'>
            {res?.found === 0 && <div className='text-c1' >
                <h1 className='text-3xl font-bold'>Result Not Found</h1>
                </div>
            }
            {res?.found > 0 && 
                <div className='w-5/6 md:w-1/2'>
                    {res?.hits?.map((theses, idx) => {
                        // console.log(theses)
                        return (
                            <div className=' p-2 ' key={idx}>
                                <h1 className='text-2xl font-bold text-c1 hover:text-c2 hover:underline cursor-pointer' onClick={() => navigate('/SearchThesisDetails', { state: { thesis: theses} }) }>
                                    {theses.document.title}
                                </h1>
                                <p className='text-gray-500'>
                                    {theses.document.url.slice(0,40)+"...."}
                                </p>
                                <p className='text-base'>
                                    {theses.document.summary}
                                </p>
                            </div>
                        )
                    })}
                </div>
            }
            <div className='hidden md:block absolute left-5 top-5 p-5 bg-gray-50'>
                <h1 className='text-xl font-semibold text-c1 '>
                    Filter: 
                </h1>
                {checkList.map((item, index) => (
                <div key={index} className="px-2 flex items-center text-base font-normal">
                    <input value={item} type="checkbox" onChange={handleCheck} className="py-1"/>
                    <span className={isChecked(item)}>{item}</span>
                </div>
            ))}
            </div>
        </div>
    </div>
  )
}

export default Search