import React, { useEffect } from "react";
import { AvailableChatsList } from "../components/AvailableChatsList";
import { JoinedChatsList } from "../components/JoinedChatsList";
import { ViewTitle } from "../components/shared/ViewTitle";
import { fetchChats } from "../actions/chats";
import { useDispatch, useSelector } from "react-redux";
import { BaseLayout } from "../layouts/Base";
import { Notifications } from "../utils/notifications";

export const Home = () => {
    const dispatch = useDispatch();
    const joined = useSelector(({ chats }) => chats.joined);
    const available = useSelector(({ chats }) => chats.available);

    useEffect(() => {
        Notifications.setup();
        dispatch(fetchChats());
    }, [dispatch]);

    return (
        <BaseLayout componentName={Home.name}>
            <div className="row no-gutters fh">
                <div className="col-3 fh">
                    <JoinedChatsList chats={joined} />
                </div>

                <div className="col-9 fh">
                    <ViewTitle text={"Choose your channel"} />

                    <AvailableChatsList chats={available} />
                </div>
            </div>
        </BaseLayout>
    );
};
