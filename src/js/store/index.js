import { applyMiddleware, configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chatSlice";
import thunkMiddleware from "redux-thunk";

const middlewares = [thunkMiddleware];

export default configureStore(
    {
        reducer: {
            chats: chatReducer,
        },
    },
    applyMiddleware(...middlewares)
);
