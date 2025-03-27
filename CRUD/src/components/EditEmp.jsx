import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons'
import { deleteEmp } from '../features/employeeSlice'
import { updateEmp } from '../features/employeeSlice'
import { toast } from 'react-toastify'
import { useState, useEffect } from 'react'
import { saveUpdatedEmp } from '../features/employeeSlice'

const EditEmp = () => {
  const [nameUpdated, setNameUpdated] = useState("")
  const [departmentUpdated, setDepartmentUpdated] = useState("")
  const [genderUpdated, setGenderUpdated] = useState("")
  const [salaryUpdated, setSalaryUpdated] = useState("")
  const empList = useSelector(state => state.empData.data)
  const [isUpdateMenuOpen, setIsUpdateMenuOpen] = useState(false);
  const singleEmp = useSelector(state => state.empData.singleData)
  const dispatch = useDispatch()
  console.log(singleEmp);

  useEffect(() => {
    if (singleEmp) {
      setNameUpdated(singleEmp.empName || "");
      setDepartmentUpdated(singleEmp.empDep || "");
      setGenderUpdated(singleEmp.empGender || "");
      setSalaryUpdated(singleEmp.empSalary || "");
    }
  }, [singleEmp]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#update-menu") && !event.target.closest("#menu-button")) {
        setIsUpdateMenuOpen(false);
      }
    };

    if (isUpdateMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUpdateMenuOpen]);

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function deleteEmployee(id) {
    dispatch(deleteEmp(id))
    toast("Employee deleted successfully")
  }

  function updateEmployee(id) {
    setIsUpdateMenuOpen(true)
    dispatch(updateEmp(id))
  }

  function saveUpdatedData(){
    const empData = {
      empName: nameUpdated,
      empDep: departmentUpdated,
      empGender: genderUpdated,
      empSalary: salaryUpdated,
      empId: singleEmp.empId
    }
    console.log(empData);
    
    dispatch(saveUpdatedEmp(empData))
    toast("Employee updated succesfully")
    setIsUpdateMenuOpen(false)
  }

  return (
    <div className='container mx-auto p-6'>
      <p className='font-semibold text-2xl mb-4'>All Employee List</p>

      {empList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-900 text-left">
                <th className="p-3 border-b border-gray-700 text-center">Name</th>
                <th className="p-3 border-b border-gray-700 text-center">Department</th>
                <th className="p-3 border-b border-gray-700 text-center">Gender</th>
                <th className="p-3 border-b border-gray-700 text-center">Salary</th>
                <th className="p-3 border-b border-gray-700 text-center">Update</th>
                <th className="p-3 border-b border-gray-700 text-center">Delete</th>
              </tr>
            </thead>
            <tbody>
              {empList.map((emp) => (
                <tr key={emp.empId} className="hover:bg-gray-700">
                  <td className="p-3 border-b border-gray-700 text-center">{Capitalize(emp.empName)}</td>
                  <td className="p-3 border-b border-gray-700 text-center">{emp.empDep}</td>
                  <td className="p-3 border-b border-gray-700 text-center">{emp.empGender}</td>
                  <td className="p-3 border-b border-gray-700 text-center">₹{emp.empSalary}</td>
                  <td className="p-3 border-b border-gray-700 text-center">
                    <button>
                      <FontAwesomeIcon icon={faPenToSquare} className='hover:text-blue-500 cursor-pointer'
                        onClick={() => { updateEmployee(emp.empId) }}
                        id='menu-button'
                      />
                    </button>
                  </td>
                  <td className="p-3 border-b border-gray-700 text-center">
                    <button>
                      <FontAwesomeIcon icon={faTrash} className='hover:text-red-500 cursor-pointer'
                        onClick={() => deleteEmployee(emp.empId)} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-4">No Employees Found</p>
      )}
      <div
        id="update-menu"
        className={`fixed top-0 right-0 w-2/3 md:w-1/3 h-full p-5 bg-gray-900 text-white shadow-lg transition-transform transform ${isUpdateMenuOpen ? "translate-x-0" : "translate-x-full"
          } `}
        style={{ transition: "transform 1.3s ease-in-out duration-300" }}
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-white cursor-pointer"
          onClick={() => setIsUpdateMenuOpen(false)}
        >
          ✖
        </button>

        <h1 className='mt-5 text-2xl font-semibold' >Update Data</h1>
        <div className='my-3'>
          <p>Name</p>
          <input
            type="text"
            name=""
            id=""
            className='border border-amber-50 px-2 py-1 rounded w-full font-semibold'
            value={nameUpdated}
            onChange={(e)=>setNameUpdated(e.target.value)}
          />
          <p className='mt-2'>Department</p>
          <select name="" id="" className='border border-amber-50 px-2 py-1 rounded w-full text-white ' style={{ backgroundColor: "#101828" }} value={departmentUpdated} onChange={(e)=>setDepartmentUpdated(e.target.value)}>
            <option name="" id="">--Select--</option>
            <option value="Accounts" >Accounts</option>
            <option value="Computer">Computer</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Manufacturing">Manufacturing</option>
          </select>
          <p className='mt-2'>Gender</p>
          <input type="radio" id='male' name='gender' value={"Male"} checked={genderUpdated == "Male"} onChange={(e)=>{setGenderUpdated(e.target.value)}} />
          <label htmlFor="male" className='px-2'>Male</label>
          <input type="radio" id='female' name='gender' value={"Female"} checked={genderUpdated == "Female"} onChange={(e)=>{setGenderUpdated(e.target.value)}} />
          <label htmlFor="female" className='px-2'>Female</label>
          <p className='mt-2'>Salary</p>
          <input
            type="text"
            name=""
            id=""
            value={salaryUpdated}
            className='border border-amber-50 px-2 py-1 rounded w-full text-white font-semibold'
            onChange={(e)=>{setSalaryUpdated(e.target.value)}}
          />
          <button className='mt-4 px-4 py-2 cursor-pointer bg-gray-800 rounded hover:bg-gray-500' onClick={saveUpdatedData}>Update</button>
        </div>
      </div>

    </div>
  )
}

export default EditEmp  