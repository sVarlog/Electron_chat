import React from "react";
import { Link } from "react-router-dom";

export const ViewTitle = ({ text }) => {
    return (
        <div className="chat-name-container d-flex align-items-center">
            <span className="name">{text}</span>

            <Link className="btn btn-outline-primary" to="/chatCreate">
                New
            </Link>
        </div>
    );
};
