import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
    name: "chats",
    initialState: {
        joined: [],
        available: [],
        activeChats: {},
        messages: {},
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
        chatMessageSend: (state, action) => {
            console.log("sended");
        },
        chatsSetMessages: (state, action) => {
            const { chatId, chatMessages } = action.payload;
            const prevMessages = state.messages[chatId] || [];
            const messages = {
                ...state.messages,
                [chatId]: [...prevMessages, ...chatMessages],
            };

            return {
                ...state,
                messages,
            };
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
    chatMessageSend,
    chatsSetMessages,
} = chatSlice.actions;

export default chatSlice.reducer;
