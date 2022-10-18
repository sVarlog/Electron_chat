import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterFrom";
import { LoadingView } from "../components/shared/LoadingView";

export const Welcome = () => {
    const [isLoginView, setIsLoginView] = useState(true);
    const user = useSelector(({ auth }) => auth.user);
    const isChecking = useSelector(({ auth }) => auth.isChecking);

    const getAuthTexts = isLoginView
        ? ["Not registered yet?", "Register"]
        : ["Already registered?", "Login"];

    if (isChecking) {
        return <LoadingView />;
    }

    if (user) {
        return <Navigate to="/" />;
    }

    return (
        <div className="centered-view">
            <div className="centered-container">
                {isLoginView ? <LoginForm /> : <RegisterForm />}

                <small className="form-text text-muted mt-2">
                    {getAuthTexts[0]}

                    <span
                        onClick={() => {
                            setIsLoginView(!isLoginView);
                        }}
                        className="btn-link ml-2"
                    >
                        {getAuthTexts[1]}
                    </span>
                </small>
            </div>
        </div>
    );
};
