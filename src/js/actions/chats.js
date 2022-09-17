import * as api from "../api/chats";
import { chatFetchSuccess } from "../store/chatSlice";

export const fetchChats = () => async (dispatch) => {
    api.fetchChats().then((chats) => dispatch(chatFetchSuccess(chats)));
};
