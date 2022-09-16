import React from "react";
import { AvailableChats } from "../components/AvailableChats";
import { JoinedChats } from "../components/JoinedChats";
import { ViewTitle } from "../components/shared/ViewTitle";

export const Home = () => {
    return (
        <div className="row no-gutters fh">
            <div className="col-3 fh">
                <JoinedChats />
            </div>

            <div className="col-9 fh">
                <ViewTitle />

                <AvailableChats />
            </div>
        </div>
    );
};
