import React, { useEffect } from "react";
import { Home } from "./views/Home.js";

import { HashRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.js";
import { Settings } from "./views/Settings.js";
import { Welcome } from "./views/Welcome.js";
import { Chat } from "./views/Chat.js";
import { useDispatch, useSelector } from "react-redux";
import { listenToAuthChanges } from "./actions/auth.js";
import { StoreProvider } from "./store/StoreProvider.js";
import { LoadingView } from "./components/shared/LoadingView.js";

const ChatApp = () => {
    const dispatch = useDispatch();
    const isChecking = useSelector(({ auth }) => auth.isChecking);

    useEffect(() => {
        dispatch(listenToAuthChanges());
    }, []);

    if (isChecking) {
        return <LoadingView />;
    }

    return (
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
    );
};

export const App = () => {
    return (
        <StoreProvider>
            <ChatApp />
        </StoreProvider>
    );
};
