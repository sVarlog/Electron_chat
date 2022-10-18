import { loadInitialSettings } from "../store/settingsSlice";
import Storage from "../utils/storage";

export const settingsInitialLoad = () => (dispatch) => {
    const settings = Storage.getItem("app-settings");
    dispatch(loadInitialSettings(settings));
};
