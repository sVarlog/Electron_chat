import * as api from "../api/auth";
import {
    authOnError,
    authOnInit,
    authOnSuccess,
    loginSuccess,
    logoutSuccess,
} from "../store/authSlice";

export const registerUser = (formData) => (dispatch) => {
    api.registerUser(formData).then((user) => {
        return user;
    });
};

export const logout = () => (dispatch) => {
    api.logout().then(() => dispatch(logoutSuccess));
};

export const loginUser = (formData) => (dispatch) => {
    api.login(formData).then((_) => {
        dispatch(loginSuccess());
    });
};

export const listenToAuthChanges = () => (dispatch) => {
    console.log("auth on init");
    dispatch(authOnInit());
    api.onAuthStateChanges((authUser) => {
        if (authUser) {
            dispatch(authOnSuccess(authUser));
            console.log("we are authenticated");
        } else {
            dispatch(authOnError());
            console.log("we aren't authenticated");
        }
    });
};
