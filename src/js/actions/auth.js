import * as api from "../api/auth";
import {
    authOnError,
    authOnInit,
    authOnSuccess,
    loginError,
    loginInit,
    logoutSuccess,
    registerError,
    registerInit,
} from "../store/authSlice";
import { checkUserConnection } from "./connection";

export const registerUser = (formData) => async (dispatch) => {
    dispatch(registerInit());
    return api.registerUser(formData).catch((e) => {
        dispatch(registerError(e));
    });
};

export const logout = (uid) => async (dispatch) => {
    console.log(uid);
    await api
        .logout()
        .then(() => dispatch(logoutSuccess))
        .then(() => {
            console.log("unlogin");
        });
    console.log("await");
    await dispatch(checkUserConnection(uid));
};

export const loginUser = (formData) => async (dispatch) => {
    dispatch(loginInit());
    return api.login(formData).catch((e) => {
        dispatch(loginError(e));
    });
};

let uid = "";

export const listenToAuthChanges = () => (dispatch) => {
    console.log("auth on init");
    dispatch(authOnInit());
    return api.onAuthStateChanges(async (authUser) => {
        if (authUser) {
            const userProfile = await api.getUserProfile(authUser.uid);
            uid = userProfile.uid;
            dispatch(authOnSuccess(userProfile));
            console.log("we are authenticated");
        } else {
            dispatch(authOnError());
            console.log("we aren't authenticated");
        }
    });
};
