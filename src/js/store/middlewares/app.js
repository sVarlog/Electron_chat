import { Notifications } from "../../utils/notifications";
import Storage from "../../utils/storage";
import { appOffline, appOnline } from "../appSlice";
import { settingsUpdate } from "../settingsSlice";
import { logoutSuccess } from "../authSlice";

export default (store) => (next) => (action) => {
    if (action.type === appOffline().type || action.type === appOnline().type) {
        const { showNotifications } = store.getState().settings;

        if (showNotifications) {
            Notifications.show({
                title: "Connection status:",
                body: action.isOnline ? "Online" : "Offline",
            });
        }
    }

    if (action.type === logoutSuccess().type) {
        const { subscriptions } = store.getState().chats;
        if (subscriptions) {
            Object.keys(subscriptions).forEach((messageSub) => {
                subscriptions[messageSub]();
            });
        }
    }

    if (action.type === settingsUpdate().type) {
        const { name, checked } = action.payload;
        const currentSettings = Storage.getItem("app-settings");
        const settings = { ...currentSettings, [name]: checked };
        Storage.setItem("app-settings", settings);
    }

    return next(action);
};
