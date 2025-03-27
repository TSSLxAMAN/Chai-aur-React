import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addEmp } from '../features/employeeSlice'
import { toast } from 'react-toastify'
const AddEmp = () => {

  const [name, setName] = useState("")
  const [department, setDepartment] = useState("")
  const [gender, setGender] = useState("")
  const [salary, setSalary] = useState("")
  const dispatch = useDispatch()

  function saveEmp() {

    const empData = {
      empName: name,
      empDep: department,
      empGender: gender,
      empSalary: salary,
      empId: Date.now()
    }

    setName('')
    setDepartment('')
    setGender('')
    setSalary('')

    // console.log(empData);

    dispatch(addEmp(empData))

    toast("Employee added succesfully")

  }

  return (
    <div className='container mx-auto p-6'>
      <p className='font-semibold text-2xl mb-4 text-center'>Add New Employee</p>
      <div className='bg-gray-900 text-white p-5 rounded-lg shadow-lg w-full md:w-1/2 mx-auto'>
        <div className='mb-3'>
          <label className='block text-lg'>Name</label>
          <input
            type='text'
            className='border border-gray-600 px-3 py-2 rounded w-full bg-gray-800 text-white'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='block text-lg'>Department</label>
          <select
            className='border border-gray-600 px-3 py-2 rounded w-full bg-gray-800 text-white'
            value={department}
            onChange={(e) => setDepartment(e.target.value)}>
            <option value=''>--Select--</option>
            <option value='Accounts'>Accounts</option>
            <option value='Computer'>Computer</option>
            <option value='Sales'>Sales</option>
            <option value='Marketing'>Marketing</option>
            <option value='Manufacturing'>Manufacturing</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='block text-lg'>Gender</label>
          <div className='flex items-center gap-4'>
            <label className='flex items-center'>
              <input type='radio' value='Male' checked={gender === 'Male'} onChange={(e) => setGender(e.target.value)} className='mr-2' /> Male
            </label>
            <label className='flex items-center'>
              <input type='radio' value='Female' checked={gender === 'Female'} onChange={(e) => setGender(e.target.value)} className='mr-2' /> Female
            </label>
          </div>
        </div>
        <div className='mb-3'>
          <label className='block text-lg'>Salary</label>
          <input
            type='text'
            className='border border-gray-600 px-3 py-2 rounded w-full bg-gray-800 text-white'
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <button className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold cursor-pointer' onClick={saveEmp}>Add Employee</button>
      </div>
    </div>
  )
}

export default AddEmp