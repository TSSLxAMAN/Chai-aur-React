import Pagination from './Pagination';
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

const TableComponent = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const rowHover = useSelector(state => state.theme.rowHover)

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const lastRowIndex = rowsPerPage * currentPage
  const firstRowIndex = lastRowIndex - rowsPerPage

  function pageHandler(selectedPage) {
    setCurrentPage(selectedPage)
  }
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full rounded-lg border border-white">
        <thead>
          <tr className=" text-left">
            <th className="p-3 border-b border-white">Name</th>
            <th className="p-3 border-b border-white">Department</th>
            <th className="p-3 border-b border-white">Gender</th>
            <th className="p-3 border-b border-white">Salary</th>
          </tr>
        </thead>
        <tbody>
          {data.slice(firstRowIndex, lastRowIndex).map((emp) => (
            <tr key={emp.empId} className={rowHover}>
              <td className="p-3 border-b border-white">{Capitalize(emp.empName)}</td>
              <td className="p-3 border-b border-white">{emp.empDep}</td>
              <td className="p-3 border-b border-white">{emp.empGender}</td>
              <td className="p-3 border-b border-white">₹{emp.empSalary}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center mt-3">
        <Pagination pages={Math.ceil(data.length / 10)} pageHandler={pageHandler} currentPage={currentPage}/>
      </div>
    </div>
  );
};
export default TableComponent