import { db } from "../db/firestore";
import firebase from "firebase/app";

const extractSnapshotData = (snapshot) => {
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const fetchChats = async () => {
    return await db.collection("chats").get().then(extractSnapshotData);
};

export const createChat = async (chat) => {
    return await db
        .collection("chats")
        .add(chat)
        .then((docRef) => docRef.id);
};

export const joinChat = async (userId, chatId) => {
    const userRef = db.doc(`profiles/${userId}`);
    const chatRef = db.doc(`chats/${chatId}`);

    await userRef.update({
        joinedChats: firebase.firestore.FieldValue.arrayUnion(chatRef),
    });
    await chatRef.update({
        joinedUsers: firebase.firestore.FieldValue.arrayUnion(userRef),
    });
};

export const subscribeToChat = (chatId, onSubscribe) => {
    return db
        .collection("chats")
        .doc(chatId)
        .onSnapshot((snapshot) => {
            const chat = { id: snapshot.id, ...snapshot.data() };
            onSubscribe(chat);
        });
};

export const subscribeToProfile = (uid, onSubscribe) => {
    return db
        .collection("profiles")
        .doc(uid)
        .onSnapshot((snapshot) => onSubscribe(snapshot.data()));
};

export const sendChatMessage = (message, chatId) => {
    return db
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .doc(message.timestamp + Math.random())
        .set(message);
};

export const subscribeToMessages = (chatId, onSubscribe) => {
    return db
        .collection("chats")
        .doc(chatId)
        .collection("messages")
        .onSnapshot((snapshot) => onSubscribe(snapshot.docChanges()));
};
