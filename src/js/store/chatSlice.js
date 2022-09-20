import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chats",
    initialState: {
        joined: [],
        available: [],
    },
    reducers: {
        chatFetchInit: (state, action) => {
            return { joined: [], available: [] };
        },
        chatFetchSuccess: (state, action) => {
            console.log("chat created", action);
            const { available, joined } = action.payload;
            return {
                available,
                joined,
            };
        },
        chatCreateSuccess: (state, action) => {
            console.log("chat created", action);
            return { ...state };
        },
    },
});

export const { chatFetchSuccess, chatCreateSuccess, chatFetchInit } =
    chatSlice.actions;

export default chatSlice.reducer;
