import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const notFound = {
    error: "Not found"
}
export const loginSlice = createSlice({
    name: 'user',
    initialState: {
        userLogin: JSON.parse(localStorage.getItem("user")) || null,
        notFound: notFound,
        success: false
    },
    reducers: {
        login: (state, actions) => {
            const userCredential = actions.payload
            const usersInfo = JSON.parse(localStorage.getItem("Employee data"))
            const authUser = usersInfo.find(emp => emp.empName === userCredential.username && userCredential.password === "admin")
            if (authUser) {
                state.userLogin = authUser
                localStorage.setItem("user", JSON.stringify(authUser));
                toast.success("Login successful!");
                state.success = true
            } else {
                state.userLogin = null
                localStorage.setItem("user", JSON.stringify
                (state.notFound))
                toast.error("Invalid credentials");   
            }
        },
        logout: (state, actions) => {
            state.userLogin = null        
            localStorage.removeItem("user")
            toast.success("Logout successfully");
            state.success = false
        }

    },
})

// Action creators are generated for each case reducer function
export const { login, logout } = loginSlice.actions

export default loginSlice.reducer