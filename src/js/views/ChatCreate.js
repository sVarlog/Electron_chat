import React from "react";
import { useForm } from "react-hook-form";
import { BaseLayout } from "../layouts/Base";

export const ChatCreate = () => {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <BaseLayout canGoBack>
            <div className="centered-view">
                <div className="centered-container">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="centered-container-form"
                    >
                        <div className="header">Create chat now!</div>

                        <div className="subheader">
                            Chat with people you know!
                        </div>

                        <div className="form-container">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>

                                <input
                                    {...register("name", { required: true })}
                                    type="text"
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">Description</label>

                                <textarea
                                    {...register("description", {
                                        required: true,
                                    })}
                                    className="form-control"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="image">Image</label>

                                <input
                                    {...register("image", { required: true })}
                                    type="text"
                                    className="form-control"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-outline-primary"
                            >
                                Create
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BaseLayout>
    );
};
