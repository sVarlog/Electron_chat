import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "App",
    initialState: {
        isOnline: window.navigator.onLine,
        settings: {
            isDarkTheme: false,
            playSound: true,
            showNotifications: true,
        },
    },
    reducers: {
        appOnline: (state, action) => {
            return { ...state, isOnline: true };
        },
        appOffline: (state, action) => {
            return { ...state, isOnline: false };
        },
        settingsUpdate: (state, { payload: { name, checked } }) => {
            return {
                ...state,
                settings: { ...state.settings, [name]: checked },
            };
        },
        loadInitialSettings: (state, action) => {
            console.log({
                ...state,
                settings: { ...state.settings, ...action.payload },
            });
            console.log(action);
            console.log("PAYLOAD INSIDE STORE");
            return {
                ...state,
                settings: { ...state.settings, ...action.payload },
            };
        },
    },
});

export const { appOnline, appOffline, settingsUpdate, loadInitialSettings } =
    appSlice.actions;

export default appSlice.reducer;
