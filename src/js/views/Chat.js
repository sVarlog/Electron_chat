import React, { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ChatUsersList } from "../components/ChatUsersList";
import { ChatMessagesList } from "../components/ChatMessagesList";
import { ViewTitle } from "../components/shared/ViewTitle";
import { BaseLayout } from "../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import {
    sendChatMessage,
    subscribeToChat,
    subscribeToMessages,
    subscribeToProfile,
} from "../actions/chats";
import { Loader } from "../components/shared/Loader";
import { Messanger } from "../components/Messanger";
import { chatsRegisterMessageSub } from "../store/chatSlice";

export const Chat = () => {
    const { id } = useParams();
    const peopleWatchers = useRef({});
    const messageList = useRef();
    const dispatch = useDispatch();
    const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
    const messages = useSelector(({ chats }) => chats.messages[id]);
    const messagesSub = useSelector(({ chats }) => chats.subscriptions[id]);
    const joinedUsers = activeChat?.joinedUsers;

    const unsubFromJoinedUsers = () => {
        for (let id of Object.keys(peopleWatchers.current)) {
            peopleWatchers.current[id]();
        }
    };

    useEffect(() => {
        const unsubFromChat = dispatch(subscribeToChat(id));

        if (!messagesSub) {
            const unsubFromMessages = dispatch(subscribeToMessages(id));
            dispatch(
                chatsRegisterMessageSub({ sub: unsubFromMessages, chatId: id })
            );
        }

        return () => {
            unsubFromChat();
            unsubFromJoinedUsers();
        };
    }, []);

    useEffect(() => {
        joinedUsers && subscribeToJoinedUsers(joinedUsers);
    }, [joinedUsers]);

    const subscribeToJoinedUsers = (jUsers) => {
        for (let user of jUsers) {
            if (!peopleWatchers.current[user.uid]) {
                peopleWatchers.current[user.uid] = dispatch(
                    subscribeToProfile(user.uid, id)
                );
            }
        }
    };

    const sendMessage = useCallback(
        (message) => {
            dispatch(sendChatMessage(message, id)).then(() =>
                messageList.current.scrollIntoView(false)
            );
        },
        [id]
    );

    return (
        <BaseLayout canGoBack componentName={Chat.name}>
            <div className="row no-gutters fh">
                <div
                    className={`col-3 fh ${
                        !activeChat?.id && "d-flex justify-content-center pt-5"
                    }`}
                >
                    {!activeChat?.id ? (
                        <Loader />
                    ) : (
                        <ChatUsersList users={activeChat?.joinedUsers} />
                    )}
                </div>

                <div
                    className={`col-9 fh ${
                        !activeChat?.id &&
                        "d-flex align-items-center justify-content-center"
                    }`}
                >
                    {!activeChat?.id ? (
                        <Loader />
                    ) : (
                        <>
                            <ViewTitle
                                text={`Channel: ${activeChat?.name || ""}`}
                            />

                            <ChatMessagesList
                                innerRef={messageList}
                                messages={messages || []}
                            />

                            <Messanger onSubmit={sendMessage} />
                        </>
                    )}
                </div>
            </div>
        </BaseLayout>
    );
};
