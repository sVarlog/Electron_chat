import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isChecking: true,
    },
    reducers: {
        authOnInit: (state, action) => {
            console.log("auth start");
            return { user: null, isChecking: true };
        },
        authOnSuccess: (state, action) => {
            console.log("auth success");
            return { user: action.payload, isChecking: false };
        },
        authOnError: (state, action) => {
            console.log("auth error");
            return { user: null, isChecking: false };
        },
        logoutSuccess: () => {
            console.log("logout");
            return {};
        },
        loginSuccess: () => {
            console.log("login");
            return {};
        },
    },
});

export const {
    authOnInit,
    authOnSuccess,
    authOnError,
    logoutSuccess,
    loginSuccess,
} = authSlice.actions;

export default authSlice.reducer;
