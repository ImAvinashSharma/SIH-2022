import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { useSortBy, useTable, usePagination } from "react-table";
import LinkBtn from '../LinkBtn';
import Loading from '../Loading';

function CollegeReqs() {
  const [college, setCollege] = useState([]);
  const [college1, setCollege1] = useState([]);
  const [CollegeName, setCollegeName] = useState("");
  const [searchCollege, setSearchCollege] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCollege() {
      axios
        .get("http://localhost:3001/getApproveListForCollegeId")
        .then(function (response) {
          setCollege(response.data);
          setCollege1(response.data);
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

  useEffect(() => {
    setCollege1(
      college.filter(item => {
        return item?.college.toLowerCase().includes(searchCollege.toLowerCase());
      })
    );
  }, [searchCollege]);

  const data = React.useMemo(() => [...college1], [college1]);

  const columns = React.useMemo(
    () => [
      {
        Header: "College ID",
        accessor: "college_id"
      },
      {
        Header: "College Name",
        accessor: "college",
        Cell: props => {
          const { value, cell, row } = props;
          // {...cell.getCellProps()} className={`is-${cell.column.id}`}
          return (
            <Link to={`/college/${row.original.college_id}`}>
              <h1 className="text-neutral-600 font-md text-base hover:underline">{value} </h1>
            </Link>
          );
        }
      },
      {
        Header: "University",
        accessor: "university"
      },
      {
        Header: "Admin",
        accessor: "adminname"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Contact No",
        accessor: "pno"
      }
    ],
    []
  );

  const tablehook = hooks => {
    hooks.visibleColumns.push(cols => [
      ...cols,
      {
        id: "action",
        Header: "Action",
        Cell: ({ row }) => (
          <LinkBtn url={`/college/${row.values.CollegeID}`} title="Approve"/>
        )
      }
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
    <>
      {loading ? (
        <Loading />
      ) : (
          <div className='w-full flex flex-col sm:px-16 md:px-32'>
            <div className="p-2 ">
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
            <div className="overflow-x-auto ">
            <table {...getTableProps()} className="shadow rounded rounded-lg w-full">
              <thead>
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column, idx) => (
                      <th {...column.getHeaderProps(column.getHeaderProps(column.getSortByToggleProps()))} className={` bg-c1 p-2 text-base text-white ${idx === 0 ? "rounded-tl": ""} ${idx === 6 ? "rounded-tr": ""}`}>
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

          </div>
      )}
    </>
  )
}

export default CollegeReqs