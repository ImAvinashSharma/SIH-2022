import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSortBy, useTable, usePagination } from "react-table";
import { Link } from "react-router-dom";
import Loading from '../components/Loading';
import { AiOutlineSearch } from 'react-icons/ai';
import axios from 'axios';

function CollegeDetails() {
    const {collegeId} = useParams()
    const [thesisList, setThesisList] = useState([]);
    const [thesisList1, setThesisList1] = useState([]);
    const [loading, setLoading] = useState(false);
    const [thesisSearch, setThesisSearch] = useState("")

    useEffect(() => {
        //  setThesisList1([
        //   {
        //     "id": 1,
        //     "thesis_id": "d321bd",
        //     "user_id": "avi",
        //     "researcher": "COLLEEN M. MCCOY",
        //     "guide": "",
        //     "title": "A STUDY OF YOGA, ITS HEALTH BENEFITS AND THE TRUE SELF",
        //     "keywords": " Yoga, True self, Self, Phenomenology, Heidegger, Qualitative",
        //     "university": "The University of Georgia",
        //     "college_id": "",
        //     "college": "",
        //     "abstract": "The purpose of this study is to explore the lived experience of yoga practitioners, and their search for the true self. The research questions guiding this study were: 1) How does a yoga practitioner describe the concept of the true self? 2) How does a yoga practitioner describe the experience of the true self while engaged in a yoga practice? 3) How does a yoga practitioner describe the experience of the true self in everyday life? I interviewed three yoga practitioners for this qualitative study. The participants were purposively chosen. Heideggerian phenomenology was the method employed to examine the lived experience of the true self. The overall themes that emerged from the data include 1) the value of yoga, 2) the body as a vehicle for the self, 3) relationships, 4) the self versus the true self, and 5) transformation.",
        //     "category": "Yoga",
        //     "vcount": 0,
        //     "created_on": "2002",
        //     "uploded_on": "2022-08-18T11:26:22.919Z",
        //     "s3url": "https://sih-data.s3.ap-south-1.amazonaws.com/A+study+of+yoga%2C+its+benefits+and+true+self.pdf"
        //   }
        // ])
        // setThesisList([
        //   {
        //     "id": 1,
        //     "thesis_id": "d321bd",
        //     "user_id": "avi",
        //     "researcher": "COLLEEN M. MCCOY",
        //     "guide": "",
        //     "title": "A STUDY OF YOGA, ITS HEALTH BENEFITS AND THE TRUE SELF",
        //     "keywords": " Yoga, True self, Self, Phenomenology, Heidegger, Qualitative",
        //     "university": "The University of Georgia",
        //     "college_id": "",
        //     "college": "",
        //     "abstract": "The purpose of this study is to explore the lived experience of yoga practitioners, and their search for the true self. The research questions guiding this study were: 1) How does a yoga practitioner describe the concept of the true self? 2) How does a yoga practitioner describe the experience of the true self while engaged in a yoga practice? 3) How does a yoga practitioner describe the experience of the true self in everyday life? I interviewed three yoga practitioners for this qualitative study. The participants were purposively chosen. Heideggerian phenomenology was the method employed to examine the lived experience of the true self. The overall themes that emerged from the data include 1) the value of yoga, 2) the body as a vehicle for the self, 3) relationships, 4) the self versus the true self, and 5) transformation.",
        //     "category": "Yoga",
        //     "vcount": 0,
        //     "created_on": "2002",
        //     "uploded_on": "2022-08-18T11:26:22.919Z",
        //     "s3url": "https://sih-data.s3.ap-south-1.amazonaws.com/A+study+of+yoga%2C+its+benefits+and+true+self.pdf"
        //   }
        // ])

        const fetchCollegeDetails = async () => {
          setLoading(true)
          await axios
              .get(`http://localhost:3001/getThesisByCollegeId/${collegeId}`)
              .then(function (response) {
                setThesisList(response.data);
                setThesisList1(response.data);
                // console.log(response.data)
              })
              .catch(function (error) {
                alert("Error fetching College Details: ", error);
              })
              .then(function () {
                setLoading(false);
              });
        }

        fetchCollegeDetails()
    }, [])

    const handleSearch= () => {
      setThesisList1(
        thesisList.filter(item => {
          return item?.title.toLowerCase().includes(thesisSearch.toLowerCase());
        })
      )
    }
    const data = React.useMemo(() => [...thesisList1], [thesisList1]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Thesis Id",
        accessor: "thesis_id"
      },
      {
        Header: "Title",
        accessor: "title",
        Cell: props => {
          const { value, cell, row } = props;
          // {...cell.getCellProps()} className={`is-${cell.column.id}`}
          return (
            <Link to={`/thesis/${row.original.thesis_id}`} state={row.original}>
              <h1 className="text-neutral-600 font-md text-base hover:underline">{value} </h1>
            </Link>
          );
        }
      },
      {
        Header: "Researcher",
        accessor: "researcher"
      },
      {
        Header: "Category",
        accessor: "category"
      },
      {
        Header: "University",
        accessor: "university"
      },
      
    ],
    []
  );

  const tablehook = hooks => {
    hooks.visibleColumns.push(cols => [
      ...cols,
    ]);
  };
  const tableInstance = useTable({ columns, data }, tablehook, useSortBy, usePagination);
  const { getTableProps, getTableBodyProps, headerGroups, page, nextPage, previousPage, 
      canNextPage, canPreviousPage, pageOptions, state, prepareRow, setPageSize } = tableInstance;

  const { pageIndex, pageSize } = state;

  const isEven = idx => {
    return !(idx & 1);
  };

  return (
    <div className='min-h-screen w-full flex flex-col'>
        <div className='font-bold text-3xl text-c1 flex justify-center p-5'>
            Thesis by {collegeId} 
        </div>
        {loading ? (
          <Loading />
          ) : (
            <div className='w-full flex flex-col'>
              <div className='w-full top-0 bg-c1 p-5 md:p-10  flex flex-col items-center justify-center text-base'>
                <div className="relative w-full sm:w-64 md:w-1/2 "> 
                    <div className="absolute top-4 left-3">
                      <AiOutlineSearch size={23} />
                    </div>
                    <input type="text" className="h-14 w-full pl-10 pr-24 rounded-lg z-0 focus:shadow focus:outline-none" 
                      placeholder="Search Thesis..." 
                      onChange={e => {
                        setThesisSearch(e.target.value);
                      }}
                      value={thesisSearch} 
                      onKeyDown={event => {
                        if (event.key === "Enter") {
                          handleSearch();
                        }
                      }} />
                    <div className="absolute top-2 right-2">    
                        <button className="h-10 w-20 text-white rounded-lg bg-c1 hover:bg-white hover:border hover:border-c1 hover:text-c1"
                            onClick={() => {
                              handleSearch();
                            }}>
                            Search
                        </button>        
                    </div>
                </div>
              </div>
              { thesisList1.length === 0  ? (
                <div className='text-center text-3xl pt-8 text-c1 font-semibold'>
                  No Result Found
                </div>
              ) : (
              <div className="p-5">
              <div className="w-full mt-5 sm:p-5 sm:px-16 md:px-32">
                <div className="p-2 text-start">
                    Show {"  "}
                    <select value={pageSize} className="border p-1"
                      onChange={(e) => setPageSize(Number(e.target.value))} >
                        {[10, 25, 50, 100].map((pageSize) => (
                          <option key={pageSize} value={pageSize}>
                            {pageSize}
                          </option>
                        ))}
                      </select>
                  </div>
                {/* table Start */}
                <div className="overflow-x-auto">
                  <table {...getTableProps()} className="shadow rounded rounded-lg w-full">
                    <thead>
                      {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                          {headerGroup.headers.map((column, idx) => (
                            <th {...column.getHeaderProps(column.getHeaderProps(column.getSortByToggleProps()))} className={`bg-c1 p-2 text-base text-white ${idx === 0 ? "rounded-tl": ""} ${idx === 4 ? "rounded-tr": ""}`}>
                              {column.render("Header")}
                              {column.isSorted ? (column.isSortedDesc ? "▼" : "▲") : ""}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                      {page.map((row, ridx) => {
                        prepareRow(row);
                        return (
                          <tr {...row.getRowProps()} className={`mb-2 border-b-2 border-neutral-100 font-md text-base ${ridx === (page.length - 1) ? "border-b-c1 rounded-b": ""}`}>
                            {row.cells.map((cell, idx) => {
                              return (
                                <td {...cell.getCellProps()} className={isEven(idx) ? "text-neutral-600 p-3 bg-neutral-50 text-center" : "text-center text-neutral-600 p-3 "}>
                                  {cell.render("Cell")}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div className="flex items-center justify-end p-3">
                  <span className="p-1">
                    Page{" "}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{" "}
                  </span>
                  <button onClick={() => previousPage()} disabled={!canPreviousPage} className="bg-neutral-100 p-2 m-1 disabled:opacity-50">
                    Previous
                  </button>
                  <button onClick={() => nextPage()} disabled={!canNextPage} className="bg-neutral-100 p-2 m-1 disabled:opacity-50">
                    Next
                  </button>
                </div>
                {/* table end  */}
                </div>
              </div>
              )}
          </div> 
        )}
        
    </div>
  )
}

export default CollegeDetails