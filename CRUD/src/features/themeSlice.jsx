import { createSlice } from '@reduxjs/toolkit';

const lightTheme = {
    bgColor: "bg-white text-orange-500",
    textColor: "text-orange-500",
    btnColor: "bg-orange-500",
    btnText: "text-white",
    navBarBgColor: "bg-orange-500",
    navBarTextColor: "text-white",
    navBarSelectedBtnColor: "text-orange-500 bg-white",
    navBarSelectedBtnColorHover: "hover:text-orange-500 hover:bg-white",
    border: "border border-orange-900",
    boxColor: "bg-orange-500 text-white",
    rowHover: "hover:bg-orange-400",
    cardColor: "bg-orange-500 text-white",
    cardColorBtn: "bg-orange-400 text-white",
};

const darkTheme = {
    bgColor: "bg-gray-800 text-white",
    textColor: "text-white",
    btnColor: "bg-gray-900",
    btnText: "text-white",
    navBarBgColor: "bg-gray-900",
    navBarTextColor: "text-white",
    navBarSelectedBtnColor: "text-gray-900 bg-white",
    navBarSelectedBtnColorHover: "hover:text-gray-900 hover:bg-white",
    border: "border border-white",
    boxColor: "bg-gray-900 text-white",
    rowHover: "hover:bg-gray-700",
    cardColor: "bg-gray-900 text-white",
    cardColorBtn: "bg-gray-700 text-white",
};

const storedTheme = localStorage.getItem('theme') === 'dark' ? darkTheme : lightTheme;

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        ...storedTheme,
        isDarkMode: localStorage.getItem('theme') === 'dark'},
    reducers: {
        toggleTheme: (state) => {
            if (state.isDarkMode) {
                Object.assign(state, lightTheme);
                localStorage.setItem('theme', 'light');
            } else {
                Object.assign(state, darkTheme);
                localStorage.setItem('theme', 'dark');
            }
            state.isDarkMode = !state.isDarkMode;
        }
    },
});

// Export actions and reducer
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
