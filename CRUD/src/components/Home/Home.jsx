import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
import TableComponent from '../TableComponent'
import NotFound from '../../assets/images/NotFound.png'

const Home = () => {

  const empList = useSelector(state => state.empData.data) || "No employee found"
  const theme = useSelector(state => state.theme.bgColor)
  const border = useSelector(state => state.theme.border)
  const boxColor = useSelector(state => state.theme.boxColor)
  
  const [query, setQuery] = useState("")
  const [result, setResult] = useState([])
  const [filter, setFilter] = useState(null)
  const dispatch = useDispatch()
  const [accounts, setAccounts] = useState(false)
  const [computer, setComputer] = useState(false)
  const [sales, setSales] = useState(false)
  const [marketing, setMarketing] = useState(false)
  const [manufacturing, setManufacturing] = useState(false)
  const [salarySlider, setSalarySlider] = useState(0)

  function search() {
    if (!query.trim()) {
      setResult([]);
      return;
    }
    const found = empList.filter((q) => q.empName.toLowerCase().includes(query.toLowerCase()));
    setResult(found || "No employee found");
  }

  function filterEmp() {
    let filteredData = empList.filter((q) => q.empSalary >= salarySlider);

    let selectedDepartments = [];
    if (accounts) selectedDepartments.push("Accounts");
    if (computer) selectedDepartments.push("Computer");
    if (sales) selectedDepartments.push("Sales");
    if (marketing) selectedDepartments.push("Marketing");
    if (manufacturing) selectedDepartments.push("Manufacturing");
    if (selectedDepartments.length > 0) {
      filteredData = filteredData.filter((q) => selectedDepartments.includes(q.empDep));
    }

    setFilter(filteredData.length > 0 ? filteredData : null);
  }

  function resetAll() {
    setAccounts(false)
    setComputer(false)
    setSales(false)
    setMarketing(false)
    setManufacturing(false)
    setSalarySlider(0)
  }

  useEffect(() => {
    filterEmp()
    search()
  }, [accounts, computer, sales, marketing, manufacturing, salarySlider,query])
  console.log("accounts", accounts);

  return (
    <div className={`${theme} mx-auto p-6`}>
      <p className='font-semibold text-3xl mb-2'>All Employee List</p>
      <div className='mb-2 flex'>
        <input type="text" className={`w-full p-2 font-semibold ${border}`} placeholder='Search..'
          value={query}
          onChange={(e) => (setQuery(e.target.value))}
          style={{outline:"none"}}
        />
      </div>
      <div className='grid grid-cols-12 gap-2'>
        <div className={`col-span-12 md:col-span-3 p-4 ${boxColor}`} >
          <p className='text-xl font-semibold'>Salary</p>
          <Slider
            aria-label="Salary"
            defaultValue={30}
            valueLabelDisplay="auto"
            color='info'
            shiftStep={30}
            step={1000}
            marks
            min={0}
            max={10000}
            onChange={(e) => (setSalarySlider(e.target.value))}
            value={salarySlider}
          />
          <div>
            <p className='text-xl font-semibold'>Department</p>
            <Checkbox id='accounts' className='border border-white' sx={{
              color: "white",
              "&.Mui-checked": { color: "white" },
            }}
              onChange={(e) => setAccounts(e.target.checked)}
              checked={accounts}
            />
            <label htmlFor="accounts">Accounts</label>
          </div>
          <div>
            <Checkbox id="computer" className='border border-white' sx={{
              color: "white",
              "&.Mui-checked": { color: "white" },
            }}
              onChange={(e) => setComputer(e.target.checked)}
              checked={computer}
            /><label htmlFor="computer">Computer</label>
          </div>
          <div>
            <Checkbox id='sales' className='border border-white' sx={{
              color: "white",
              "&.Mui-checked": { color: "white" },
            }}
              onChange={(e) => setSales(e.target.checked)}
              checked={sales}
            />
            <label htmlFor="sales">Sales</label>
          </div>
          <div>
            <Checkbox id="marketing" className='border border-white' sx={{
              color: "white",
              "&.Mui-checked": { color: "white" },
            }}
              onChange={(e) => setMarketing(e.target.checked)}
              checked={marketing}
            /><label htmlFor="marketing">Marketing</label>
          </div>
          <div>
            <Checkbox id='manufacturing' className='border border-white' sx={{
              color: "white",
              "&.Mui-checked": { color: "white" },
            }}
              onChange={(e) => setManufacturing(e.target.checked)}
              checked={manufacturing}
            /><label htmlFor="manufacturing">Manufacturing</label>
          </div>
          <button className='w-full px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-white font-semibold cursor-pointer' onClick={resetAll} >Reset Filter</button>
        </div>
        <div className={`col-span-12 md:col-span-9 p-4 ${boxColor}`}>
          {result.length > 0 ? (
            <TableComponent data={result} />
          ) : filter !== null && filter.length > 0 ? (
            <TableComponent data={filter} />
          ) : (
            <div className='flex justify-center items-center h-full'>
              <div className=''>
                <img src={NotFound} className='mx-auto' height={40} width={40} />
                <p className="text-white font-semibold my-3">No employee found.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
};
export default Home