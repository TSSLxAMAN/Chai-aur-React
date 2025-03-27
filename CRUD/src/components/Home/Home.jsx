import React from 'react'
import { useSelector } from 'react-redux'


const Home = () => {
  
  const empList = useSelector(state => state.empData.data)
  
  function Capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  return (
    <div className='container mx-auto p-6'>
      <p className='font-semibold text-2xl mb-4'>All Employee List</p>

      {empList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white border border-gray-700 rounded-lg">
            <thead>
              <tr className="bg-gray-900 text-left">
                <th className="p-3 border-b border-gray-700">Name</th>
                <th className="p-3 border-b border-gray-700">Department</th>
                <th className="p-3 border-b border-gray-700">Gender</th>
                <th className="p-3 border-b border-gray-700">Salary</th>
              </tr>
            </thead>
            <tbody>
              {empList.map((emp) => (
                <tr key={emp.empId} className="hover:bg-gray-700">  
                  <td className="p-3 border-b border-gray-700">{Capitalize(emp.empName)}</td>
                  <td className="p-3 border-b border-gray-700">{emp.empDep}</td>
                  <td className="p-3 border-b border-gray-700">{emp.empGender}</td>
                  <td className="p-3 border-b border-gray-700">₹{emp.empSalary}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center text-gray-400 mt-4">No Employees Found</p>
      )}
    </div>
  )
}

export default Home