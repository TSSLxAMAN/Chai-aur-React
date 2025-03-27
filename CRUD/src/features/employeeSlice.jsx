import { createSlice } from '@reduxjs/toolkit'

export const employeeSlice = createSlice({
    name: 'empData',
    initialState: {
        data: JSON.parse(localStorage.getItem("Employee data")) || [],
        singleData: ""
    },
    reducers: {
        addEmp: (state, actions) => {
            state.data.push(actions.payload)
            localStorage.setItem("Employee data", JSON.stringify(state.data))
        },

        deleteEmp: (state, actions) => {
            console.log(state.data)
            state.data = state.data.filter(emp => emp.empId !== actions.payload)

            localStorage.setItem("Employee data", JSON.stringify(state.data))
        },

        updateEmp: (state, actions) => {
            const id = state.data.find(emp => emp.empId === actions.payload)
            state.singleData = id
        },

        saveUpdatedEmp: (state, actions) => {
            const { empId, empName, empDep, empGender, empSalary } = actions.payload;
            const empIndex = state.data.findIndex(emp => emp.empId === empId)
            if (empIndex !== -1) {
                state.data[empIndex] = {
                    ...state.data[empIndex],
                    empName,
                    empDep,
                    empGender,
                    empSalary
                };
                localStorage.setItem("Employee data", JSON.stringify(state.data))
            }
        }

    },
})

// Action creators are generated for each case reducer function
export const { addEmp, deleteEmp, updateEmp, saveUpdatedEmp } = employeeSlice.actions

export default employeeSlice.reducer