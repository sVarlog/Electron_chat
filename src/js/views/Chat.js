import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChatUsersList } from "../components/ChatUsersList";
import { ChatMessagesList } from "../components/ChatMessagesList";
import { ViewTitle } from "../components/shared/ViewTitle";
import { BaseLayout } from "../layouts/Base";
import { useDispatch } from "react-redux";
import { subscribeToChat } from "../actions/chats";

export const Chat = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        const unsubFromChat = dispatch(subscribeToChat(id));

        return () => {
            unsubFromChat();
        };
    }, [dispatch]);

    return (
        <BaseLayout canGoBack componentName={Chat.name}>
            <div className="row no-gutters fh">
                <div className="col-3 fh">
                    <ChatUsersList />
                </div>

                <div className="col-9 fh">
                    <ViewTitle text={`Joined channel: ${id}`} />
                    <ChatMessagesList />
                </div>
            </div>
        </BaseLayout>
    );
};
