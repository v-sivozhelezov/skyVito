/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    allAds: [],
    chosenAdv: '',
};

const adsSlice = createSlice({
    name: 'ads',
    initialState,
    reducers: {
        setAllAds(state, action) {
            state.allAds = action.payload;
        },
        setChosenAdv(state, action) {
            state.chosenAdv = action.payload;
        },
    },
});
export const { setAllAds, setChosenAdv } = adsSlice.actions;
export const selectAllAds = (state) => state.ads.allAds;
export const selectChosenAdv = (state) => state.ads.chosenAdv;
export const adsReducer = adsSlice.reducer;
