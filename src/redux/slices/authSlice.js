/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const AUTH_INFO = 'auth';

function getAuthFromLocalStorage() {
    try {
        return JSON.parse(localStorage.getItem(AUTH_INFO));
    } catch (error) {
        console.error(error);
        return null;
    }
}

// console.log(JSON.parse(localStorage.getItem(AUTH_INFO)));

const initialState = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    city: '',
    access: '',
    refresh: '',
};

// console.log(initialState);

const authSlice = createSlice({
    name: 'auth',
    initialState: getAuthFromLocalStorage() ?? initialState,
    reducers: {
        setAuth(state, action) {
            const payload = action.payload ?? initialState;

            state.id = payload.id;
            state.email = payload.email;
            state.username = payload.username;
            state.access = payload.access;
            state.refresh = payload.refresh;
            state.firstName = payload.firstName;
            state.lastName = payload.lastName;

            localStorage.setItem(AUTH_INFO, JSON.stringify(state));
        },
    },
});
export const { setAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
