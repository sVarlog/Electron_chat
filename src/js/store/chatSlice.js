import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chats",
    initialState: {
        joined: [],
        available: [],
    },
    reducers: {
        chatFetchInit: (state, action) => {
            return { ...state, joined: [], available: [] };
        },
        chatFetchSuccess: (state, action) => {
            const { available, joined } = action.payload;
            return {
                ...state,
                available,
                joined,
            };
        },
        chatCreateSuccess: (state, action) => {
            return { ...state };
        },
        chatJoinedSuccess: (state, action) => {
            const joined = state.joined.concat([action.payload]);
            const available = state.available.filter(
                (chat) => chat.id !== action.payload.id
            );
            return {
                ...state,
                available,
                joined,
            };
        },
        chatSetActiveChat: (state, action) => {
            console.log("chat set active chat", action.payload);
        },
    },
});

export const {
    chatFetchSuccess,
    chatCreateSuccess,
    chatFetchInit,
    chatJoinedSuccess,
    chatSetActiveChat,
} = chatSlice.actions;

export default chatSlice.reducer;
