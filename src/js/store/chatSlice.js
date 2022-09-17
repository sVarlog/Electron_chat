import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chat",
    initialState: {
        message: "test",
    },
    reducers: {
        newMsg: (state) => {
            state.message = "test1";
        },
    },
});

export const { newMsg } = chatSlice.actions;

export default chatSlice.reducer;
