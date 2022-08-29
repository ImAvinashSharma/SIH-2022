import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import MiniSearch from "minisearch";
import { AiOutlineSearch } from "react-icons/ai";
import { useSortBy, useTable, usePagination } from "react-table";
import { Link } from "react-router-dom";
import CustBtn from "../components/CustBtn";
import LinkBtn from "../components/LinkBtn";
import Loading from "../components/Loading";
import { Transition } from "@headlessui/react";

function ThesisList() {
  const [loading, setLoading] = useState(false);
  const [thesisList, setThesisList] = useState([]);
  const [thesisList1, setThesisList1] = useState([]);
  const [results, setResults] = useState([]);
  const [autoSuggest, setautoSuggest] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);
  const inputReference = useRef(null);
  const onSearchFocus = () => setSearchFocus(true);
  const onSearchBlur = () => setSearchFocus(false);

  function handleSearch(e) {
    // https://lucaong.github.io/minisearch/
    let miniSearch = new MiniSearch({
      fields: ["title", "text"], // fields to index for full-text search
      storeFields: ["title", "category"] // fields to return with search results
    });
    miniSearch.addAll(thesisList);
    setResults(miniSearch.search(e));
    setautoSuggest(miniSearch.autoSuggest(e, { fuzzy: 0.2 }));
    if (results.length > 0) {
      setThesisList1(
        thesisList.filter(item => {
          return item?.title.toLowerCase().includes(results[0].title.toLowerCase());
        })
      );
    } else {
      setThesisList1(thesisList);
    }
  }
  useEffect(() => {
    async function fetchCollege() {
      axios
        .get("http://localhost:3001/thesisList")
        .then(function (response) {
          setThesisList(response.data);
          setThesisList1(response.data);
        })
        .catch(function (error) {
          alert("Error fetching", error);
        })
        .then(function () {
          setLoading(false);
        });
    }
    fetchCollege();
  }, []);

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

  //TODO: React-Table & search
  return (
    <div className=" flex flex-col items-center">
      
      {loading ? (
        <Loading />
      ) : (
        <>
        {/*}
          <div className="">
            <label className="relative block w-64 sm:w-96 ">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <AiOutlineSearch size={25} />
              </span>
              <input
                type="text"
                placeholder="Search Thesis"
                onChange={e => {
                  setSearchValue(e.target.value);
                  handleSearch(e.target.value);
                }}
                value={searchValue}
                className="placeholder:italic placeholder:text-slate-400 block
                bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm "
                onFocus={onSearchFocus}
                ref={inputReference}
                onKeyDown={event => {
                  if (event.key === "Enter") {
                    onSearchBlur();
                    handleSearch(searchValue);
                    inputReference.current.blur();
                  }
                }}
              />
            </label>
            <button
              onClick={() => {
                onSearchBlur();
                handleSearch(searchValue);
              }}
              className=" hidden sm:inline ml-2 px-4 py-3 bg-c1 text-white rounded hover:bg-white border
              hover:border-c1 hover:text-c1 transition ease-in-out duration-300 hover:scale-105"
            >
              Search
            </button>
            {searchFocus && (
              <div className={`bg-white ${searchValue? "border shadow": ""} rounded w-64 sm:w-96 `}>
                {autoSuggest.map((item, idx) => {
                  return (
                    <div
                      className="w-64 sm:w-96 p-2 hover:bg-indigo-500 hover:text-white rounded "
                      onClick={() => {
                        setSearchValue(item.suggestion);
                        onSearchBlur();
                        handleSearch(item.suggestion);
                        // inputReference.current.focus();
                      }}
                      key={idx}
                    >
                      {item.suggestion}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
              */}
          {/* search start  */}
          <div className='w-full top-0 bg-c1 p-5 md:p-10  flex flex-col items-center justify-center text-base'>
            <div className="relative z-10 w-full sm:w-64 md:w-1/2 "> 
                <div className="absolute top-4 left-3">
                   <AiOutlineSearch size={23} />
                </div>
                <input type="text" className="h-14 w-full pl-10 pr-24 rounded-lg z-0 focus:shadow focus:outline-none" 
                  placeholder="Search Thesis..." 
                  onChange={e => {
                    setSearchValue(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={searchValue} onFocus={onSearchFocus}
                  ref={inputReference}
                  onKeyDown={event => {
                    if (event.key === "Enter") {
                      onSearchBlur();
                      handleSearch(searchValue);
                      inputReference.current.blur();
                    }
                  }} />
                <div className="absolute top-2 right-2">    
                    <button className="h-10 w-20 text-white rounded-lg bg-c1 hover:bg-white hover:border hover:border-c1 hover:text-c1"
                        onClick={() => {
                          onSearchBlur();
                          handleSearch(searchValue);
                        }}>
                        Search
                    </button>        
                </div>
            </div>
                <div className={`${searchFocus? "-translate-y-0.5 z-0 bg-gray-100 p-2 w-full sm:w-64 md:w-1/2 -mt-5 pt-5 rounded" :"hidden"}`}>
                    <Transition show={searchFocus} enter="transition ease-out duration-100 transform" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="transition ease-in duration-75 transform" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">   
                    {autoSuggest.map((i,idx) => {
                        return (<div className=' p-2 flex hover:bg-white rounded transition ease-in-out duration-300 hover:scale-105' 
                            onClick={() => {
                              setSearchValue(i.suggestion);
                              onSearchBlur();
                              handleSearch(i.suggestion);
                            }}>
                            <span className='pr-2'>
                                <AiOutlineSearch size={23} /> 
                            </span>
                            <p className=''>
                                {i.suggestion}
                            </p>
                        </div>)
                    })}
                    </Transition>
                </div>
            {!searchFocus && searchValue !== "" && (
              <div className=" p-2  w-64 sm:w-96">
                <p className="text-gray-200  text-center text-xs">{results.length === 0 ? `No Result Found for ${searchValue}` : `${results.length} Thesis Found`}</p>
              </div>
            )}
        </div>
        {/* search end */}
          <div className="w-full p-5">
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
        </>
      )}
    </div>
  );
}

export default ThesisList;
