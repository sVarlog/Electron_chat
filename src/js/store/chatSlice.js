import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chats",
    initialState: {
        items: [],
    },
    reducers: {
        chatFetchSuccess: (state, action) => {
            console.log("start");
            state.items = action.payload;
        },
    },
});

export const { chatFetchSuccess } = chatSlice.actions;

export default chatSlice.reducer;
