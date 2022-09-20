import { db } from "../db/firestore";
import firebase from "firebase/app";
import "firebase/auth";

const createUserProfile = async (userProfile) => {
    await db.collection("profiles").doc(userProfile.uid).set(userProfile);
};

export const getUserProfile = async (uid) => {
    return db
        .collection("profiles")
        .doc(uid)
        .get()
        .then((snapshot) => {
            console.log(snapshot.data());
            return snapshot.data();
        });
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

export const logout = async () => {
    await firebase.auth().signOut();
};

export const login = async ({ email, password }) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
};

export const onAuthStateChanges = (onAuth) => {
    firebase.auth().onAuthStateChanged(onAuth);
};
