import React from "react";
import { Navbar } from "../components/Navbar";

export const BaseLayout = ({ children, ...props }) => {
    return (
        <>
            <Navbar {...props} />
            {children}
        </>
    );
};
