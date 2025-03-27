import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '../features/employeeSlice'
export default configureStore({
    reducer: {
        empData: employeeSlice
    },
})