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
    name: '',
    surname: '',
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

            state.access = payload.access;
            state.refresh = payload.refresh;
            localStorage.setItem(AUTH_INFO, JSON.stringify(state));
        },
        setAuthUser(state, action) {
            const payload = action.payload ?? initialState;

            state.id = payload.id;
            state.email = payload.email;
            state.name = payload.name;
            state.surname = payload.surname;
            state.city = payload.city;

            localStorage.setItem(AUTH_INFO, JSON.stringify(state));
        },
        deleteAuthUser(state) {
            state.auth = initialState;
        },
    },
});
export const { setAuth, setAuthUser, deleteAuthUser } = authSlice.actions;
export const authReducer = authSlice.reducer;
