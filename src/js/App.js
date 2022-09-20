import React, { useEffect } from "react";
import { Home } from "./views/Home.js";

import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Settings } from "./views/Settings.js";
import { Welcome } from "./views/Welcome.js";
import { Chat } from "./views/Chat.js";
import { useDispatch, useSelector } from "react-redux";
import { listenToAuthChanges } from "./actions/auth.js";
import { StoreProvider } from "./store/StoreProvider.js";

function RequireAuth({ children }) {
    const user = useSelector(({ auth }) => auth.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

const ChatApp = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listenToAuthChanges());
    }, []);

    return (
        <HashRouter>
            <div className="content-wrapper">
                <Routes>
                    <Route path="/login" exact element={<Welcome />} />

                    <Route
                        path="/home"
                        element={
                            <RequireAuth>
                                <Home />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/settings"
                        element={
                            <RequireAuth>
                                <Settings />
                            </RequireAuth>
                        }
                    />

                    <Route
                        path="/chat/:id"
                        element={
                            <RequireAuth>
                                <Chat />
                            </RequireAuth>
                        }
                    />
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
