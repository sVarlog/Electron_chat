import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";
import appMiddleware from "./middlewares/app";

import chatReducer from "./chatSlice";
import authReducer from "./authSlice";
import appReducer from "./appSlice";

export default configureStore({
    reducer: {
        chats: chatReducer,
        auth: authReducer,
        app: appReducer,
    },
    middleware: [thunkMiddleware, appMiddleware],
});
