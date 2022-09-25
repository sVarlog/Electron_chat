import * as api from "../api/chats";
import { db } from "../db/firestore";
import {
    chatCreateSuccess,
    chatFetchInit,
    chatFetchSuccess,
    chatJoinedSuccess,
    chatSetActiveChat,
    chatUpdateUserState,
} from "../store/chatSlice";

export const fetchChats = () => async (dispatch, getState) => {
    dispatch(chatFetchInit());
    const { user } = getState().auth;
    const chats = await api.fetchChats();

    for (let chat of chats) {
        chat.joinedUsers = chat.joinedUsers.map((user) => user.id);
    }

    const sortedChats = chats.reduce(
        (accuChats, chat) => {
            accuChats[
                chat.joinedUsers.includes(user.uid) ? "joined" : "available"
            ].push(chat);
            return accuChats;
        },
        { joined: [], available: [] }
    );

    dispatch(chatFetchSuccess(sortedChats));

    return sortedChats;
};

export const createChate = (formData, userId) => async (dispatch) => {
    const newChat = { ...formData };
    newChat.admin = db.doc(`profiles/${userId}`);
    newChat.joinedUsers = [];

    const chatId = await api.createChat(newChat);
    dispatch(chatCreateSuccess());
    await api.joinChat(userId, chatId);
    dispatch(chatJoinedSuccess({ ...newChat, id: chatId }));

    return chatId;
};

export const joinChat = (chat, uid) => async (dispatch) => {
    return api.joinChat(uid, chat.id).then(() => {
        dispatch(chatJoinedSuccess(chat));
    });
};

export const subscribeToChat = (chatId) => (dispatch) => {
    return api.subscribeToChat(chatId, async (chat) => {
        const joinedUsers = await Promise.all(
            chat.joinedUsers.map(async (userRef) => {
                const userSnapshot = await userRef.get();
                return userSnapshot.data();
            })
        );

        chat.joinedUsers = joinedUsers;

        dispatch(chatSetActiveChat(chat));
    });
};

export const subscribeToProfile = (uid, chatId) => (dispatch) => {
    return api.subscribeToProfile(uid, (user) => {
        console.log("changing profile", user);
        dispatch(chatUpdateUserState({ user, chatId }));
    });
};
