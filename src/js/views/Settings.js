import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { BaseLayout } from "../layouts/Base";
import { settingsUpdate } from "../store/appSlice";

export const Settings = () => {
    const dispatch = useDispatch();
    const { isDarkTheme, playSound, showNotifications } = useSelector(
        ({ app }) => app
    );

    const handleChange = ({ target: { checked, name } }) => {
        dispatch(settingsUpdate(name, checked));
    };

    return (
        <BaseLayout canGoBack componentName={Settings.name}>
            <div className="centered-view">
                <div className="centered-container">
                    <form className="centered-container-form">
                        <div className="header">
                            Adjust application settings
                        </div>

                        <div className="form-container">
                            <div className="my-3">
                                <div className="form-check">
                                    <input
                                        onChange={handleChange}
                                        checked={isDarkTheme}
                                        name="isDarkTheme"
                                        type="checkbox"
                                        className="form-check-input"
                                    />

                                    <label className="form-check-label">
                                        Dark Theme
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        onChange={handleChange}
                                        checked={showNotifications}
                                        name="showNotifications"
                                        type="checkbox"
                                        className="form-check-input"
                                    />

                                    <label className="form-check-label">
                                        Enable Notification
                                    </label>
                                </div>

                                <div className="form-check">
                                    <input
                                        onChange={handleChange}
                                        checked={playSound}
                                        name="playSound"
                                        type="checkbox"
                                        className="form-check-input"
                                    />

                                    <label className="form-check-label">
                                        Sound notification
                                    </label>
                                </div>
                            </div>

                            <button
                                type="button"
                                onClick={() => {}}
                                className="btn btn-danger"
                            >
                                Quit App
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </BaseLayout>
    );
};
