import React, { useEffect } from "react";
import { fetchChats } from "../api/chats";
import { AvailableChatsList } from "../components/AvailableChatsList";
import { JoinedChatsList } from "../components/JoinedChatsList";
import { ViewTitle } from "../components/shared/ViewTitle";

export const Home = () => {
    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinedChatsList />
            </div>

            <div className="col-9 fh">
                <ViewTitle text={"Choose your channel"} />

                <AvailableChatsList />
            </div>
        </div>
    );
};
