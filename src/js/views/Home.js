import React, { useEffect } from "react";
import { AvailableChatsList } from "../components/AvailableChatsList";
import { JoinedChatsList } from "../components/JoinedChatsList";
import { ViewTitle } from "../components/shared/ViewTitle";
import { fetchChats } from "../actions/chats";
import { useDispatch, useSelector } from "react-redux";
import { BaseLayout } from "../layouts/Base";

export const Home = () => {
    const dispatch = useDispatch();
    const chats = useSelector(({ chats }) => chats.items);

    useEffect(() => {
        dispatch(fetchChats());
    }, [dispatch]);

    return (
        <BaseLayout componentName={Home.name}>
            <div className="row no-gutters fh">
                <div className="col-3 fh">
                    <JoinedChatsList chats={chats} />
                </div>

                <div className="col-9 fh">
                    <ViewTitle text={"Choose your channel"} />

                    <AvailableChatsList chats={chats} />
                </div>
            </div>
        </BaseLayout>
    );
};
