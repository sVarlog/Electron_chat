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
            console.log("auth success", action);
            return { user: action.payload, isChecking: false };
        },
        authOnError: (state, action) => {
            console.log("auth error");
            return { user: null, isChecking: false };
        },
        registerInit: (state, action) => {
            console.log("register init");
            return { ...state, isChecking: true };
        },
        registerSuccess: (state, action) => {
            console.log("register success");
            return { ...state, isChecking: false };
        },
        loginInit: (state, action) => {
            console.log("login init");
            return { ...state, isChecking: true };
        },
        loginSuccess: (state, action) => {
            console.log("login");
            return { ...state, isChecking: false };
        },
        logoutSuccess: (state, action) => {
            console.log("logout");
            return { user: null, isChecking: false };
        },
    },
});

export const {
    authOnInit,
    authOnSuccess,
    authOnError,
    logoutSuccess,
    loginSuccess,
    registerInit,
    registerSuccess,
    loginInit,
} = authSlice.actions;

export default authSlice.reducer;
