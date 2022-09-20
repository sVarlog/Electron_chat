import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../actions/auth";

export const RegisterForm = () => {
    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const error = useSelector(({ auth }) => auth.registerError);

    const onSubmit = (registerData) => {
        dispatch(registerUser(registerData));
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="centered-container-form"
        >
            <div className="header">Create an account</div>

            <div className="form-container">
                <div className="form-group">
                    <label htmlFor="email">Email</label>

                    <input
                        {...register("email", { required: true })}
                        type="email"
                        className="form-control"
                        aria-describedby="emailHelp"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>

                <div className="form-group">
                    <label htmlFor="username">Username</label>

                    <input
                        {...register("username", { required: true })}
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="avatar">Avatar</label>

                    <input
                        {...register("avatar")}
                        type="text"
                        className="form-control"
                        aria-describedby="emailHelp"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <input
                        {...register("password", { required: true })}
                        type="password"
                        className="form-control"
                    />
                </div>

                {error && (
                    <div className="alert alert-danger small">
                        {error.message}
                    </div>
                )}

                <button type="submit" className="btn btn-outline-primary">
                    Register
                </button>
            </div>
        </form>
    );
};
