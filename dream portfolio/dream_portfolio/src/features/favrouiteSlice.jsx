import { createSlice } from '@reduxjs/toolkit';

export const favouriteSlice = createSlice({
    name: 'favourite',
    initialState: {
        dataFav: JSON.parse(localStorage.getItem("Stocks")) || [],
    },
    reducers: {
        addFav: (state, actions) => {
            state.dataFav.push(actions.payload)
            localStorage.setItem("Stocks", JSON.stringify(state.dataFav))
        },

        removeFav: (state, actions) => {
            state.dataFav = state.dataFav.filter((stock) => stock.id !== actions.payload.id);
            localStorage.setItem("Stocks", JSON.stringify(state.dataFav));
        }
    },
});

export const { addFav, removeFav } = favouriteSlice.actions;

export default favouriteSlice.reducer;