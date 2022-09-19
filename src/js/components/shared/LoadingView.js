import React from "react";
import { Loader } from "./Loader";

export const LoadingView = ({ message = "Loading" }) => {
    return (
        <div className="loading-screen">
            <div className="loading-view">
                <Loader />
            </div>
        </div>
    );
};
