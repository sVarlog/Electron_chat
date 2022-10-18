import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isChecking: true,
        loginError: null,
        registerError: null,
    },
    reducers: {
        authOnInit: (state, action) => {
            console.log("auth start");
            return { user: null, isChecking: true };
        },
        authOnSuccess: (state, action) => {
            console.log("auth success", action);
            return {
                user: action.payload,
                isChecking: false,
                loginError: null,
                registerError: null,
            };
        },
        authOnError: (state, action) => {
            console.log("auth error");
            return { user: null, isChecking: false };
        },
        registerInit: (state, action) => {
            console.log("register init");
            return { ...state, isChecking: true, registerError: null };
        },
        registerError: (state, action) => {
            console.log("register error");
            return {
                user: null,
                isChecking: false,
                registerError: action.payload,
            };
        },
        loginInit: (state, action) => {
            console.log("login init");
            return { ...state, isChecking: true, loginError: null };
        },
        loginError: (state, action) => {
            console.log("login error");
            return {
                user: null,
                isChecking: false,
                loginError: action.payload,
            };
        },
        logoutSuccess: (state, action) => {
            console.log("LOGOOOOUT =-=-=-=-", action);
            return { user: null, isChecking: false };
        },
    },
});

export const {
    authOnInit,
    authOnSuccess,
    authOnError,
    logoutSuccess,
    registerInit,
    registerError,
    loginInit,
    loginError,
} = authSlice.actions;

export default authSlice.reducer;
