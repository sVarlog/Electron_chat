import * as api from "../api/connection";

export const checkUserConnection = (uid) => (dispatch) => {
    api.onConnectionChanged((isConnected) => {
        api.setUserOnlineStatus(uid, isConnected);
        dispatch({ type: "" });
    });
};
