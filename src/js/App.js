import React, { useEffect } from "react";
import { Home } from "./views/Home.js";

import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Settings } from "./views/Settings.js";
import { Welcome } from "./views/Welcome.js";
import { Chat } from "./views/Chat.js";
import { useDispatch, useSelector } from "react-redux";
import { listenToAuthChanges } from "./actions/auth.js";
import { StoreProvider } from "./store/StoreProvider.js";
import { listenToConnectionChanges } from "./actions/app.js";
import { LoadingView } from "./components/shared/LoadingView.js";
import { ChatCreate } from "./views/ChatCreate.js";
import { checkUserConnection } from "./actions/connection";
import { settingsInitialLoad } from "./actions/settings.js";

function RequireAuth({ children }) {
    const user = useSelector(({ auth }) => auth.user);

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

let userId = "";

const ChatApp = () => {
    const dispatch = useDispatch();
    const isOnline = useSelector(({ app }) => app.isOnline);
    const user = useSelector(({ auth }) => auth.user);
    const { isDarkTheme } = useSelector(({ settings }) => settings);

    useEffect(() => {
        dispatch(settingsInitialLoad());
        dispatch(listenToAuthChanges());
        dispatch(listenToConnectionChanges());

        return () => {
            dispatch(listenToAuthChanges());
            dispatch(listenToConnectionChanges());
        };
    }, [dispatch]);

    useEffect(() => {
        if (user?.uid) {
            userId = user.uid;
            dispatch(checkUserConnection(userId, "online"));
        }

        return () => {
            console.log("offline", userId);
            userId && dispatch(checkUserConnection(userId, "offline"));
            userId = user ? user.uid : "";
        };
    }, [dispatch, user]);

    if (!isOnline) {
        return <LoadingView />;
    }

    return (
        <HashRouter>
            <div
                className={`content-wrapper ${isDarkTheme ? "dark" : "light"}`}
            >
                <Routes>
                    <Route path="/login" exact element={<Welcome />} />

                    <Route
                        path="/"
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

                    <Route
                        path="/chatCreate"
                        element={
                            <RequireAuth>
                                <ChatCreate />
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
