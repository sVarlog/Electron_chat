import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        isDarkTheme: false,
        playSound: true,
        showNotifications: true,
        savable: true,
    },
    reducers: {
        settingsUpdate: (state, { payload: { name, checked } }) => {
            return {
                ...state,
                [name]: checked,
            };
        },
        loadInitialSettings: (state, action) => {
            return {
                ...state,
                ...action.payload,
            };
        },
    },
});

export const { settingsUpdate, loadInitialSettings } = settingsSlice.actions;

export default settingsSlice.reducer;
