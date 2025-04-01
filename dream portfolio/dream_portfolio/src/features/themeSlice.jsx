import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        
    },
    reducers: {
        
    },
});

export const { toggle } = themeSlice.actions;

export default themeSlice.reducer;