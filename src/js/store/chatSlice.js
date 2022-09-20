import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chats",
    initialState: {
        items: [],
    },
    reducers: {
        chatFetchSuccess: (state, action) => {
            console.log("chat fetch");
            return { items: action.payload };
        },
        chatCreateSuccess: (state, action) => {},
    },
});

export const { chatFetchSuccess, chatCreateSuccess } = chatSlice.actions;

export default chatSlice.reducer;
