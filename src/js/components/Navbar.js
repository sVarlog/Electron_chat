import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../actions/auth";
import { BackButton } from "./shared/BackButton";

export const Navbar = ({ canGoBack, componentName }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const user = useSelector(({ auth }) => auth.user);

    return (
        <div className="chat-navbar">
            <nav className="chat-navbar-inner">
                <div className="chat-navbar-inner-left">
                    {canGoBack && <BackButton />}

                    {componentName !== "Settings" && (
                        <Link
                            to="/settings"
                            className="btn btn-outline-success ml-2"
                        >
                            Settings
                        </Link>
                    )}
                </div>

                <div className="chat-navbar-inner-right">
                    {!user && (
                        <button
                            onClick={() => navigate("/")}
                            className="btn btn-outline-success ml-2"
                        >
                            Login
                        </button>
                    )}

                    {user && (
                        <div className="user-wrapper">
                            <span className="logged-in-user">
                                Hi {user.username}
                            </span>

                            <img className="avatar ml-2" src={user.avatar} />

                            <button
                                onClick={() => dispatch(logout())}
                                className="btn btn-outline-danger ml-2"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </nav>
        </div>
    );
};
