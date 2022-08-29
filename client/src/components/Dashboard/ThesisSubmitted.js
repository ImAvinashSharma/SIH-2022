import React, { useState, useEffect, useRef } from "react";
import { useSortBy, useTable, usePagination } from "react-table";
import { Link } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading";
import useAuth from "../../hooks/useAuth";


function ThesisSubmitted() {
const [loading, setLoading] = useState(true);
  const [thesisList, setThesisList] = useState([]);
  const [thesisList1, setThesisList1] = useState([]);
  const {userData} = useAuth()
  useEffect(() => {
    async function fetchCollege() {
      axios
        .get(`http://localhost:3001/getThesisByUserId/${userData.user_id}`)
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
      )
      }
    </div>
  )
}

export default ThesisSubmitted