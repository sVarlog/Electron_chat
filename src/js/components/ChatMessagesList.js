import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { formatTimeAgo } from "../utils/time";

export const ChatMessagesList = ({ messages = [], innerRef }) => {
    const user = useSelector(({ auth }) => auth.user);

    const getAuthorUsername = (username) => {
        if (!username) return;

        return username.length > 7 ? `${username.slice(0, 7)}..` : username;
    };

    const isAuthorOf = useCallback((message) => {
        return message?.author.uid === user.uid;
    });

    return (
        <div className="chat-container">
            <ul
                ref={innerRef}
                className={`chat-box chatContainerScroll ${
                    messages.length === 0 && "empty"
                }`}
            >
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <li
                            className={
                                isAuthorOf(message) ? "chat-right" : "chat-left"
                            }
                            key={message.id}
                        >
                            <div className="chat-avatar">
                                <img
                                    src={message?.author.avatar}
                                    alt="Retail Admin"
                                />

                                <div className="chat-name">
                                    {getAuthorUsername(
                                        message?.author.username
                                    )}
                                </div>
                            </div>

                            <div className="chat-text-wrapper">
                                <span className="chat-text">
                                    {message.content}
                                </span>

                                <span className="chat-spacer"></span>

                                <div className="chat-hour">
                                    {formatTimeAgo(message.timestamp)}
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p>There are any messages yet...</p>
                )}
            </ul>
        </div>
    );
};
