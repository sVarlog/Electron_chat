import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from "redux-thunk";

import chatReducer from "./chatSlice";
import authReducer from "./authSlice";

const middlewares = [thunkMiddleware];

console.log(authReducer.actions);

export default configureStore(
    {
        reducer: {
            chats: chatReducer,
            auth: authReducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
            }),
    },
    applyMiddleware(...middlewares)
);
