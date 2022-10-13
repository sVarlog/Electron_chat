import { Notifications } from "../../utils/notifications";
import { appOffline, appOnline } from "../appSlice";
import { logoutSuccess } from "../authSlice";

export default (store) => (next) => (action) => {
    if (action.type === appOffline().type || action.type === appOnline().type) {
        Notifications.show({
            title: "Connection status:",
            body: action.isOnline ? "Online" : "Offline",
        });
    }

    if (action.type === logoutSuccess().type) {
        const { subscriptions } = store.getState().chats;
        debugger;
        if (subscriptions) {
            Object.keys(subscriptions).forEach((messageSub) => {
                subscriptions[messageSub]();
            });
        }
    }

    return next(action);
};
