import { combineReducers, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import appMiddleware from "./middlewares/app";

import chatReducer from "./chatSlice";
import authReducer, { logoutSuccess } from "./authSlice";
import appReducer from "./appSlice";

const mainReducer = combineReducers({
    chats: chatReducer,
    auth: authReducer,
    app: appReducer,
});

const rootReducer = (state, action) => {
    if (action.type === logoutSuccess().type) {
        state = undefined;
    }

    return mainReducer(state, action);
};

export default configureStore({
    reducer: rootReducer,
    middleware: [thunkMiddleware, appMiddleware],
});
