import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chats",
    initialState: {
        joined: [],
        available: [],
        activeChats: [],
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
            const chat = action.payload;
            const activeChats = { ...state.activeChats, [chat.id]: chat };
            return { ...state, activeChats };
        },
        chatUpdateUserState: (state, action) => {
            const { user, chatId } = action.payload;
            const joinedUsers = state.activeChats[chatId].joinedUsers;
            const index = joinedUsers.findIndex((ju) => ju.uid === user.uid);

            if (index < 0) {
                return state;
            }
            if (joinedUsers[index].state === user.state) {
                return state;
            }

            joinedUsers[index].state = user.state;
        },
    },
});

export const {
    chatFetchSuccess,
    chatCreateSuccess,
    chatFetchInit,
    chatJoinedSuccess,
    chatSetActiveChat,
    chatUpdateUserState,
} = chatSlice.actions;

export default chatSlice.reducer;
