import { Notifications } from "../../utils/notifications";
import { appOffline, appOnline, settingsUpdate } from "../appSlice";
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

    if (action.type === settingsUpdate().type) {
        const { name, checked } = action.payload;
        const currentSettings = localStorage.getItem("app-settings");
        const parsedCurrentSettings = currentSettings
            ? JSON.parse(currentSettings)
            : {};

        const settings = { ...parsedCurrentSettings, [name]: checked };
        const stringifiedSettings = JSON.stringify(settings);
        localStorage.setItem("app-settings", stringifiedSettings);
    }

    return next(action);
};
