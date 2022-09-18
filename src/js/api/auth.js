import firebase from "firebase/app";
import "firebase/auth";

export const registerUser = async ({ email, password }) => {
    try {
        const { user } = await firebase
            .auth()
            .createUserWithEmailAndPassword(email.trim(), password);
        return user;
    } catch (e) {
        return Promise.reject(e.messsage);
    }
};
