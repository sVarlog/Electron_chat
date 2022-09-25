import { appOffline, appOnline } from "../store/appSlice";

const onStatusChange = (dispatch) => {
    console.log("status changed");
    const isOnline = window.navigator.onLine;
    const action = isOnline ? appOnline : appOffline;

    dispatch(action());
};

export const listenToConnectionChanges = () => (dispatch) => {
    window.addEventListener("online", () => onStatusChange(dispatch));
    window.addEventListener("offline", () => onStatusChange(dispatch));

    return () => {
        window.removeEventListener("online", () => onStatusChange(dispatch));
        window.removeEventListener("offline", () => onStatusChange(dispatch));
    };
};
