import * as api from "../api/connection";

export const checkUserConnection = (uid, status) => (dispatch) => {
    api.onConnectionChanged(() => {
        console.log("CHANGED STATUS", uid, status);
        api.setUserOnlineStatus(uid, status);
        dispatch({ type: "" });
    });
};
