import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEmp } from '../features/employeeSlice';
import { toggleTheme } from '../features/themeSlice';
import { toast } from 'react-toastify';

const AddEmp = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [gender, setGender] = useState("");
  const [salary, setSalary] = useState("");
  
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);

  function saveEmp() {
    const empData = {
      empName: name,
      empDep: department,
      empGender: gender,
      empSalary: salary,
      empId: Date.now(),
    };

    setName('');
    setDepartment('');
    setGender('');
    setSalary('');

    dispatch(addEmp(empData));
    toast("Employee added successfully");
  }

  return (
    <div className={`mx-auto p-6 ${theme.bgColor} h-screen`}>
      <p className={`font-semibold text-2xl mb-4 text-center ${theme.textColor}`}>Add New Employee</p>
      <div className={`p-5 rounded-lg shadow-lg w-full md:w-1/2 mx-auto ${theme.boxColor}`}>
        <div className='mb-3'>
          <label className='block text-lg'>Name</label>
          <input
            type='text'
            className={`border px-3 py-2 rounded w-full ${theme.border} ${theme.bgColor}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='mb-3'>
          <label className='block text-lg'>Department</label>
          <select
            className={`border px-3 py-2 rounded w-full ${theme.border} ${theme.bgColor}`}
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
            className={`border px-3 py-2 rounded w-full ${theme.border} ${theme.bgColor}`}
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
          />
        </div>
        <button className={`mt-4 w-full px-4 py-2 bg-gray-500 text-white rounded`} onClick={saveEmp}>Add Employee</button>
      </div>
    </div>
  );
};

export default AddEmp;
