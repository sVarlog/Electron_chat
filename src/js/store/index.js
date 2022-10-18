import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import appMiddleware from "./middlewares/app";

import chatReducer from "./chatSlice";
import authReducer, { logoutSuccess } from "./authSlice";
import appReducer from "./appSlice";
import settingsReducer from "./settingsSlice";

const mainReducer = combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer,
    settings: settingsReducer,
});

const rootReducer = (state, action) => {
    if (action.type === logoutSuccess().type) {
        Object.keys(state).forEach((stateKey) => {
            console.log(
                state,
                stateKey,
                state[stateKey],
                state[stateKey].savable
            );
            if (state[stateKey].savable) {
                return;
            }

            state[stateKey] = undefined;
        });
    }

    return mainReducer(state, action);
};

export default configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware, appMiddleware],
});
