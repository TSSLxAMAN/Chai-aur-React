import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Dashboard = () => {
  // Get theme colors from Redux store
  const themeBgColor = useSelector((state) => state.theme.bgColor);
  const themeTextColor = useSelector((state) => state.theme.textColor);
  const user = useSelector((state) => state.user.userLogin);
  const empList = useSelector((state) => state.empData.data);
  const dispatch = useDispatch();

  // Handle Appraisal Click
  const handleAppraisal = (empName) => {
    toast.success(`Appraisal requested for ${empName}`);
  };

  return (
    <div className={`min-h-screen p-6 ${themeBgColor} ${themeTextColor}`}>
      <h1 className="text-3xl font-semibold">Dashboard</h1>
      <p className="mt-2 text-xl font-semibold">Welcome {user.empName} !!</p>

      {/* Employee Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full  border border-gray-700 rounded-lg" style={{backgroundColor:themeBgColor }}>
          <thead>
            <tr className=" text-left">
              <th className="p-3 border-b border-gray-700 text-center">Name</th>
              <th className="p-3 border-b border-gray-700 text-center">Department</th>
              <th className="p-3 border-b border-gray-700 text-center">Gender</th>
              <th className="p-3 border-b border-gray-700 text-center">Salary</th>
              <th className="p-3 border-b border-gray-700 text-center">Appraisal</th>
            </tr>
          </thead>
          <tbody>
            {empList.length > 0 ? (
              empList.map((emp) => (
                <tr key={emp.empId} className="">
                  <td className="p-3 border-b border-gray-700 text-center">{emp.empName}</td>
                  <td className="p-3 border-b border-gray-700 text-center">{emp.empDep}</td>
                  <td className="p-3 border-b border-gray-700 text-center">{emp.empGender}</td>
                  <td className="p-3 border-b border-gray-700 text-center">₹{emp.empSalary}</td>
                  <td className="p-3 border-b border-gray-700 text-center">
                    <button
                      className="px-4 py-2 rounded-lg transition"
                      style={{backgroundColor:themeBgColor}}
                      onClick={() => handleAppraisal(emp.empName)}
                    >
                      Request Appraisal
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center text-gray-400 p-4">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
