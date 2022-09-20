import * as api from "../api/chats";
import { db } from "../db/firestore";
import { chatCreateSuccess, chatFetchSuccess } from "../store/chatSlice";

export const fetchChats = () => async (dispatch) => {
    return api.fetchChats().then((chats) => dispatch(chatFetchSuccess(chats)));
};

export const createChate = (formData, userId) => async (dispatch) => {
    const newChat = { ...formData };
    newChat.admin = db.doc(`profiles/${userId}`);
    newChat.joinedUsers = [];

    const chatId = await api.createChat(newChat);
    dispatch(chatCreateSuccess());
    await api.joinChat(userId, chatId);

    return chatId;
};
