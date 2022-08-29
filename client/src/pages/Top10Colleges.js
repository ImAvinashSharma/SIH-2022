import React, { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useSortBy, useTable, usePagination } from "react-table";
import LinkBtn from "../components/LinkBtn";
import { Link } from "react-router-dom";

function Top10Colleges() {
    const { collegeData, fetchCollegeData} = useAuth();
    const [collegeDataS , setCollegeDataS] = useState([])
    useEffect(()=> {
      
      if(!collegeData){
        fetchCollegeData()
      }
      setCollegeDataS(collegeData.sort((a, b) => b.thesisNo - a.thesisNo).slice(0,10));
    }, [collegeData])
    const data = React.useMemo(() => [...collegeDataS], [collegeDataS]);
    const columns = React.useMemo(
      () => [
        {
          Header: "College ID",
          accessor: "college_id"//CollegeID
        },
        {
          Header: "College Name",
          accessor: "college",
          Cell: props => {
            const { value, cell, row } = props;
            return (
              <Link to={`/college/${row.original.college_id}`}>
                <h1 className="text-neutral-600  font-md text-base hover:underline">{value} </h1>
              </Link>
            );
          }
        },
        {
          Header: "University",
          accessor: "university"
        },
        {
          Header: "Thesis",
          accessor: "thesisno"
        }
      ],
      []
    );
    const tablehook = hooks => {
      hooks.visibleColumns.push(cols => [
        ...cols,
        // {
        //   id: "View",
        //   Header: "View",
        //   Cell: ({ row }) => (
        //     <LinkBtn url={`/college/${row.values.CollegeID}`} title="View"/>
        //   )
        // }
      ]);
    };
    const tableInstance = useTable({ columns, data }, tablehook, useSortBy, usePagination);
    const { getTableProps, getTableBodyProps, headerGroups, page, state, prepareRow } = tableInstance;  
    const isEven = idx => {
      return !(idx & 1);
    };

  return (
    <div className="overflow-x-auto ">
        <table {...getTableProps()} className="shadow rounded rounded-lg w-full">
            <thead>
            {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx) => (
                    <th {...column.getHeaderProps(column.getHeaderProps(column.getSortByToggleProps()))} className={`bg-c1 p-2 text-base text-white ${idx === 0 ? "rounded-tl": ""} ${idx === 3 ? "rounded-tr": ""}`}>
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
                <tr {...row.getRowProps()} className={`mb-2 border-b-2  border-neutral-100 font-md text-base ${ridx === 9 ? "border-b-c1 rounded-b": ""}`}>
                    {row.cells.map((cell, idx) => {
                    return (
                        <td {...cell.getCellProps()} className={` ${isEven(idx) ? "text-neutral-600 p-3 bg-neutral-50 text-center" : "text-center text-neutral-600 p-3 " } `}>
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
  )
}

export default Top10Colleges