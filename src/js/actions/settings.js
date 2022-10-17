import { loadInitialSettings } from "../store/appSlice";

export const settingsInitialLoad = () => (dispatch) => {
    const storedSettings = localStorage.getItem("app-settings");
    const settings = storedSettings ? JSON.parse(storedSettings) : {};
    dispatch(loadInitialSettings(settings));
};
