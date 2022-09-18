import * as api from "../api/auth";

export const registerUser = (formData) => (dispatch) => {
    api.registerUser(formData).then((user) => {
        return user;
    });
};
