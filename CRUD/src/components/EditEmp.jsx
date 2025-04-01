import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { deleteEmp, updateEmp, saveUpdatedEmp } from '../features/employeeSlice';
import { toast } from 'react-toastify';

const EditEmp = () => {
  const dispatch = useDispatch();
  const empList = useSelector(state => state.empData.data);
  const singleEmp = useSelector(state => state.empData.singleData);

  // Get theme colors from Redux store
  const themeBgColor = useSelector(state => state.theme.bgColor);
  const themeTextColor = useSelector(state => state.theme.textColor);
  const themeCardBgColor = useSelector(state => state.theme.cardBgColor);
  const themeBorderColor = useSelector(state => state.theme.borderColor);
  const themeBtnColor = useSelector(state => state.theme.buttonColor);
  const themeBtnHoverColor = useSelector(state => state.theme.buttonHoverColor);
  const setNavTheme = useSelector(state => state.theme.navBarBgColor)

  const [nameUpdated, setNameUpdated] = useState("");
  const [departmentUpdated, setDepartmentUpdated] = useState("");
  const [genderUpdated, setGenderUpdated] = useState("");
  const [salaryUpdated, setSalaryUpdated] = useState("");
  const [isUpdateMenuOpen, setIsUpdateMenuOpen] = useState(false);

  useEffect(() => {
    if (singleEmp) {
      setNameUpdated(singleEmp?.empName || "");
      setDepartmentUpdated(singleEmp?.empDep || "");
      setGenderUpdated(singleEmp?.empGender || "");
      setSalaryUpdated(singleEmp?.empSalary || "");
    }
  }, [singleEmp]);

  const handleClickOutside = useCallback((event) => {
    if (!event.target.closest("#update-menu") && !event.target.closest("#menu-button")) {
      setIsUpdateMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isUpdateMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUpdateMenuOpen, handleClickOutside]);

  const Capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "";

  const deleteEmployee = (id) => {
    dispatch(deleteEmp(id));
    toast.success("Employee deleted successfully");
  };

  const updateEmployee = (id) => {
    setIsUpdateMenuOpen(true);
    dispatch(updateEmp(id));
  };

  const saveUpdatedData = () => {
    const empData = {
      empName: nameUpdated,
      empDep: departmentUpdated,
      empGender: genderUpdated,
      empSalary: salaryUpdated,
      empId: singleEmp?.empId
    };

    dispatch(saveUpdatedEmp(empData));
    toast.success("Employee updated successfully");
    setIsUpdateMenuOpen(false);
  };

  return (
    <div className={`mx-auto p-6 ${themeBgColor} ${themeTextColor}`}>
      <p className="font-semibold text-2xl mb-4">All Employee List</p>

      {empList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className={`min-w-full ${themeCardBgColor} ${themeTextColor} border ${themeBorderColor} rounded-lg`}>
            <thead>
              <tr className="text-left">
                <th className={`p-3 border-b ${themeBorderColor} text-center`}>Name</th>
                <th className={`p-3 border-b ${themeBorderColor} text-center`}>Department</th>
                <th className={`p-3 border-b ${themeBorderColor} text-center`}>Gender</th>
                <th className={`p-3 border-b ${themeBorderColor} text-center`}>Salary</th>
                <th className={`p-3 border-b ${themeBorderColor} text-center`}>Update</th>
                <th className={`p-3 border-b ${themeBorderColor} text-center`}>Delete</th>
              </tr>
            </thead>
            <tbody>
              {empList.map((emp) => (
                <tr key={emp.empId} className="hover:bg-gray-700">
                  <td className={`p-3 border-b ${themeBorderColor} text-center`}>{Capitalize(emp.empName)}</td>
                  <td className={`p-3 border-b ${themeBorderColor} text-center`}>{emp.empDep}</td>
                  <td className={`p-3 border-b ${themeBorderColor} text-center`}>{emp.empGender}</td>
                  <td className={`p-3 border-b ${themeBorderColor} text-center`}>₹{emp.empSalary}</td>
                  <td className={`p-3 border-b ${themeBorderColor} text-center`}>
                    <button>
                      <FontAwesomeIcon icon={faPenToSquare} className="hover:text-blue-500 cursor-pointer"
                        onClick={() => { updateEmployee(emp.empId) }}
                        id="menu-button"
                      />
                    </button>
                  </td>
                  <td className={`p-3 border-b ${themeBorderColor} text-center`}>
                    <button>
                      <FontAwesomeIcon icon={faTrash} className="hover:text-red-500 cursor-pointer"
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

      {/* Update Menu */}
      <div
        id="update-menu"
        className={`fixed top-0 right-0 w-2/3 md:w-1/3 h-full p-5 ${setNavTheme} ${themeTextColor} shadow-lg transition-transform transform ${isUpdateMenuOpen ? "translate-x-0" : "translate-x-full"} `}
        style={{ transition: "transform 1.3s ease-in-out duration-300" }}
      >
        <button
          className="absolute top-4 right-4 cursor-pointer"
          onClick={() => setIsUpdateMenuOpen(false)}
        >
          ✖
        </button>

        <h1 className="mt-5 text-2xl font-semibold">Update Data</h1>
        <div className="my-3">
          <p>Name</p>
          <input
            type="text"
            className={`border ${themeBorderColor} px-2 py-1 rounded w-full font-semibold`}
            value={nameUpdated}
            onChange={(e) => setNameUpdated(e.target.value)}
          />
          <p className="mt-2">Department</p>
          <select className={`border ${themeBorderColor} px-2 py-1 rounded w-full`} value={departmentUpdated} onChange={(e) => setDepartmentUpdated(e.target.value)}>
            <option value="">--Select--</option>
            <option value="Accounts">Accounts</option>
            <option value="Computer">Computer</option>
            <option value="Sales">Sales</option>
            <option value="Marketing">Marketing</option>
            <option value="Manufacturing">Manufacturing</option>
          </select>
          <p className="mt-2">Gender</p>
          <input type="radio" id="male" name="gender" value="Male" checked={genderUpdated === "Male"} onChange={(e) => setGenderUpdated(e.target.value)} />
          <label htmlFor="male" className="px-2">Male</label>
          <input type="radio" id="female" name="gender" value="Female" checked={genderUpdated === "Female"} onChange={(e) => setGenderUpdated(e.target.value)} />
          <label htmlFor="female" className="px-2">Female</label>
          <p className="mt-2">Salary</p>
          <input type="text" className={`border ${themeBorderColor} px-2 py-1 rounded w-full`} value={salaryUpdated} onChange={(e) => setSalaryUpdated(e.target.value)} />
          <button className={`mt-4 px-4 py-2 cursor-pointer ${themeBtnColor} rounded hover:${themeBtnHoverColor}`} onClick={saveUpdatedData}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default EditEmp;
