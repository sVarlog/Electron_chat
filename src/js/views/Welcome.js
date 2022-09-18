import React, { useState } from "react";
import { LoginForm } from "../components/auth/LoginForm";
import { RegisterForm } from "../components/auth/RegisterFrom";

export const Welcome = () => {
    const [isLoginView, setIsLoginView] = useState(true);

    const getAuthTexts = isLoginView
        ? ["Not registered yet?", "Register"]
        : ["Already registered?", "Login"];

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
