import React from "react";
import { Home } from "./views/Home.js";

import { HashRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar.js";
import { Settings } from "./views/Settings.js";
import { Login } from "./views/Login.js";
import { Register } from "./views/Register.js";
import { Chat } from "./views/Chat.js";

export const App = () => {
    return (
        <HashRouter>
            <Navbar />

            <div className="content-wrapper">
                <Routes>
                    <Route path="/settings" element={<Settings />} />

                    <Route path="/login" element={<Login />} />

                    <Route path="/register" element={<Register />} />

                    <Route path="/chat/:id" element={<Chat />} />

                    <Route path="/" element={<Home />} />
                </Routes>
            </div>
        </HashRouter>
    );
};
