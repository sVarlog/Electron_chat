import { Provider } from "react-redux";
import React from "react";

import configureStore from "./index.js";

export const StoreProvider = ({ children }) => {
    return <Provider store={configureStore}>{children}</Provider>;
};
