import React from "react";
import { useSelector } from "react-redux";
import { Loader } from "./Loader";

export const LoadingView = () => {
    const { isDarkTheme } = useSelector(({ app }) => app.settings);

    return (
        <div className={isDarkTheme ? "dark" : "light"}>
            <div className="loading-screen">
                <div className="loading-view">
                    <Loader />
                </div>
            </div>
        </div>
    );
};
