import React from "react";
import { Home } from "./views/Home.js";

import { HashRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.js";
import { Settings } from "./views/Settings.js";
import { Welcome } from "./views/Welcome.js";
import { Chat } from "./views/Chat.js";
import { Provider } from "react-redux";
import configureStore from "./store/index.js";

export const App = () => {
    return (
        <Provider store={configureStore}>
            <HashRouter>
                <Navbar />

                <div className="content-wrapper">
                    <Routes>
                        <Route path="/" exact element={<Welcome />} />

                        <Route path="/home" element={<Home />} />

                        <Route path="/settings" element={<Settings />} />

                        <Route path="/chat/:id" element={<Chat />} />
                    </Routes>
                </div>
            </HashRouter>
        </Provider>
    );
};
