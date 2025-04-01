import { configureStore } from '@reduxjs/toolkit'
import employeeSlice from '../features/employeeSlice'
import  themeSlice  from '../features/themeSlice'
import loginSlice from '../features/loginSlice' 
export default configureStore({
    reducer: {
        empData: employeeSlice,
        theme: themeSlice,
        user: loginSlice,
    },
})