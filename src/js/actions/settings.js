import { loadInitialSettings } from "../store/appSlice";
import Storage from "../utils/storage";

export const settingsInitialLoad = () => (dispatch) => {
    const settings = Storage.getItem("app-settings");
    dispatch(loadInitialSettings(settings));
};
