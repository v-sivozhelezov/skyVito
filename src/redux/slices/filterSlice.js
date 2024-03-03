/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    filteredAds: '',
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilteredAds: (state, action) => {
            state.filteredAds = action.payload;
        },
        clearFilteredAds: (state) => {
            state.filteredAds = initialState;
        },
    },
});

export const { setFilteredAds, clearFilteredAds } = filterSlice.actions;
export const selectFilterAds = (state) => state.filter.filteredAds;

export const filterReducer = filterSlice.reducer;
