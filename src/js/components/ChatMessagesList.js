import React from "react";

export const ChatMessagesList = ({ messages = [] }) => {
    console.log(messages, "MESSAGE =>>>>>>>");
    const getAuthorUsername = (username) => {
        if (!username) return;

        return username.length > 7 ? `${username.slice(0, 7)}..` : username;
    };

    return (
        <div className="chat-container">
            <ul
                className={`chat-box chatContainerScroll ${
                    messages.length === 0 && "empty"
                }`}
            >
                {messages.length > 0 ? (
                    messages.map((message) => (
                        <li className="chat-left" key={message.id}>
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
                                    {message.timestamp}
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
