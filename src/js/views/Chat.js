import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { ChatUsersList } from "../components/ChatUsersList";
import { ChatMessagesList } from "../components/ChatMessagesList";
import { ViewTitle } from "../components/shared/ViewTitle";
import { BaseLayout } from "../layouts/Base";
import { useDispatch, useSelector } from "react-redux";
import { subscribeToChat, subscribeToProfile } from "../actions/chats";

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
                    subscribeToProfile(user.uid)
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
                <div className="col-3 fh">
                    <ChatUsersList users={activeChat?.joinedUsers} />
                </div>

                <div className="col-9 fh">
                    <ViewTitle text={`Channel: ${activeChat?.name || ""}`} />
                    <ChatMessagesList />
                </div>
            </div>
        </BaseLayout>
    );
};
