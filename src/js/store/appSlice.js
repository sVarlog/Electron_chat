import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "App",
    initialState: {
        isOnline: window.navigator.onLine,
    },
    reducers: {
        appOnline: (state, action) => {
            return { ...state, isOnline: true };
        },
        appOffline: (state, action) => {
            return { ...state, isOnline: false };
        },
    },
});

export const { appOnline, appOffline } = appSlice.actions;

export default appSlice.reducer;
