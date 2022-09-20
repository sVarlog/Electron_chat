import * as api from "../api/chats";
import { db } from "../db/firestore";
import {
    chatCreateSuccess,
    chatFetchInit,
    chatFetchSuccess,
    chatJoinedSuccess,
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
