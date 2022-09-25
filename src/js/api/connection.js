import firebase from "firebase/app";
import "firebase/database";
import { db } from "../db/firestore";

const getOnlineStatus = (onlineStatus) => {
    return {
        state: onlineStatus,
        lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
    };
};

export const setUserOnlineStatus = (uid, onlineStatus) => {
    const userRef = db.doc(`/profiles/${uid}`);
    return userRef.update(getOnlineStatus(onlineStatus));
};

export const onConnectionChanged = (onConnection) => {
    firebase
        .database()
        .ref(".info/connected")
        .on("value", (snapshot) => {
            const isConnected = snapshot?.val() ? snapshot.val() : false;
            onConnection(isConnected);
        });
};
