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
                console.log("Removing array:", actions.payload);
                const arrayToRemove = actions.payload;
            
                state.dataFav = state.dataFav.filter(
                    (stocksRow) => JSON.stringify(stocksRow) !== JSON.stringify(arrayToRemove)
                );
            
                localStorage.setItem("Stocks", JSON.stringify(state.dataFav));
            }
        },
    });

    export const { addFav, removeFav } = favouriteSlice.actions;

    export default favouriteSlice.reducer;