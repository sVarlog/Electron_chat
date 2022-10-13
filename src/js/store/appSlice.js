import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "App",
    initialState: {
        isOnline: window.navigator.onLine,
        isDarkTheme: false,
        playSound: true,
        showNotifications: true,
    },
    reducers: {
        appOnline: (state, action) => {
            return { ...state, isOnline: true };
        },
        appOffline: (state, action) => {
            return { ...state, isOnline: false };
        },
        settingsUpdate: (state, action) => {
            return { ...state, [action.setting]: action.value };
        },
    },
});

export const { appOnline, appOffline, settingsUpdate } = appSlice.actions;

export default appSlice.reducer;
