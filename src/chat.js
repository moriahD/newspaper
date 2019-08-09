import React, { useEffect, useRef } from "react";
import { socket } from "./socket";
import { useSelector } from "react-redux";
import axios from "./axios";

export default function Chat() {
    const chatMessages = useSelector(state => state && state.msgs);

    console.log("here are my last 10 messages: ", chatMessages);

    const elemRef = useRef();

    useEffect(() => {
        console.log("chat hooks mounted!");
        console.log("elemRef", elemRef);
        console.log("scroll top: ", elemRef.current.scrollTop);
        console.log("scroll height: ", elemRef.current.scrollHeight);
        console.log("client height: ", elemRef.current.clientHeight);
        elemRef.current.scrollTop =
            elemRef.current.scrollHeight - elemRef.current.clientHeight;
    }, []);
    const keyCheck = e => {
        // console.log("e.target.value: ", e.target.value);
        console.log("e.key", e.key);
        if (e.key === "Enter") {
            e.preventDefault();
            // console.log("Enter was pressed!");
            socket.emit("newMessage", e.target.value);
            e.target.value = "";
        }
    };
    return (
        <div className="chatbox" style={{ padding: "70px 20px 20px 20px" }}>
            <h1>Chat Room</h1>
            <div className="chat-container" ref={elemRef}>
                {chatMessages &&
                    chatMessages.map(msgs => (
                        <div key={msgs.id}>
                            <div className="chatInner">
                                <div className="chatInner2">
                                    <img src={msgs.image} />
                                    <div className="whatever">
                                        <span>{msgs.first_name}</span> :{" "}
                                        {msgs.message}
                                        <span className="chatdate">
                                            {msgs.created_at}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <textarea
                placeholder="Add your message here. (max 1000 characters)"
                onKeyDown={keyCheck}
            />
        </div>
    );
}
