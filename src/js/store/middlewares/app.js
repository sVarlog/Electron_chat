import { Notifications } from "../../utils/notifications";
import { appOffline, appOnline } from "../appSlice";

export default (store) => (next) => (action) => {
    if (action.type === appOffline().type || action.type === appOnline().type) {
        Notifications.show({
            title: "Connection status:",
            body: action.isOnline ? "Online" : "Offline",
        });
    }
    return next(action);
};
