import React from "react";

export const ViewTitle = ({ text }) => {
    return (
        <div className="chat-name-container">
            <span className="name">{text}</span>
        </div>
    );
};
