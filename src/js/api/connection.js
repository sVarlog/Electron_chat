import firebase from "firebase/app";
import "firebase/database";
import { db } from "../db/firestore";

const getOnlineStatus = (isOnline) => {
    return {
        state: isOnline ? "online" : "offline",
        lastChanged: firebase.firestore.FieldValue.serverTimestamp(),
    };
};

export const setUserOnlineStatus = (uid, isOnline) => {
    const userRef = db.doc(`/profiles/${uid}`);
    return userRef.update(getOnlineStatus(isOnline));
};

export const onConnectionChanged = (onConnection) => {
    firebase
        .database()
        .ref(".info/disconected")
        .on("value", () => {
            console.log("disconected");
        });

    firebase
        .database()
        .ref(".info/connected")
        .on("value", (snapshot) => {
            console.log("connection changed", snapshot, snapshot.val());
            const isConnected = snapshot?.val() ? snapshot?.val() : false;
            onConnection(isConnected);
        });
    // .on("value", (value) => {
    //     const con = myConnectionsRef.push();
    //     con.onDisconnect().remove();

    //     console.log("changed", value, value.val());
    // });
};
