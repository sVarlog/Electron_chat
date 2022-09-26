import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ChatUsersList } from "../components/ChatUsersList";
import { ChatMessagesList } from "../components/ChatMessagesList";
import { ViewTitle } from "../components/shared/ViewTitle";
import { BaseLayout } from "../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToChat, subscribeToProfile } from "../actions/chats";
import { LoadingView } from "../components/shared/LoadingView";
import { Loader } from "../components/shared/Loader";

export const Chat = () => {
    const { id } = useParams();
    const peopleWatchers = useRef({});
    const dispatch = useDispatch();
    const activeChat = useSelector(({ chats }) => chats.activeChats[id]);
    const joinedUsers = activeChat?.joinedUsers;

    useEffect(() => {
        dispatch(subscribeToChat(id));

        return () => {
            dispatch(subscribeToChat(id));
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

    const unsubFromJoinedUsers = () => {
        for (let id of Object.keys(peopleWatchers.current)) {
            peopleWatchers.current[id]();
        }
    };

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
                            <ChatMessagesList />
                        </>
                    )}
                </div>
            </div>
        </BaseLayout>
    );
};
