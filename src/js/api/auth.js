import { db } from "../db/firestore";
import firebase from "firebase/app";
import "firebase/auth";

const createUserProfile = async (userProfile) => {
    await db.collection("profiles").doc(userProfile.uid).set(userProfile);
};

export const registerUser = async ({ email, password, username, avatar }) => {
    try {
        const { user } = await firebase
            .auth()
            .createUserWithEmailAndPassword(email.trim(), password);
        await createUserProfile({
            uid: user.uid,
            username,
            email,
            avatar,
            joinedChats: [],
        });
    } catch (e) {
        console.log("error", e);
        return Promise.reject(e.messsage);
    }
};
