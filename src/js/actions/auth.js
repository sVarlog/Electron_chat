import * as api from "../api/auth";
import {
    authOnError,
    authOnInit,
    authOnSuccess,
    loginError,
    loginInit,
    loginSuccess,
    logoutSuccess,
    registerError,
    registerInit,
    registerSuccess,
} from "../store/authSlice";

export const registerUser = (formData) => async (dispatch) => {
    dispatch(registerInit());
    return api
        .registerUser(formData)
        .then((user) => {
            dispatch(registerSuccess());
        })
        .catch((e) => {
            dispatch(registerError(e));
        });
};

export const logout = () => (dispatch) => {
    api.logout().then(() => dispatch(logoutSuccess));
};

export const loginUser = (formData) => async (dispatch) => {
    dispatch(loginInit());
    return api
        .login(formData)
        .then((_) => {
            dispatch(loginSuccess());
        })
        .catch((e) => {
            dispatch(loginError(e));
        });
};

export const listenToAuthChanges = () => (dispatch) => {
    console.log("auth on init");
    dispatch(authOnInit());
    api.onAuthStateChanges(async (authUser) => {
        if (authUser) {
            const userProfile = await api.getUserProfile(authUser.uid);
            dispatch(authOnSuccess(userProfile));
            console.log("we are authenticated");
        } else {
            dispatch(authOnError());
            console.log("we aren't authenticated");
        }
    });
};
