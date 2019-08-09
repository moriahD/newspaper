import React, { useState, useEffect } from "react";
import axios from "./axios";
export default function FriendButton(props) {
    const [button, setButton] = useState();
    const id = props.otherProfileId;
    const name = props.otherProfileName;
    console.log(name);

    useEffect(() => {
        (async () => {
            const buttonText = await axios.get(`/friendshipList/${id}.json`);
            setButton(buttonText.data.button);
            console.log("buttonText:", buttonText.data.button);
        })();
    }, []);
    async function submit() {
        // console.log("clicked button");
        try {
            const request = await axios.post(`/friendshipList/${id}.json`, {
                button
            });
            setButton(request.data.button);
        } catch (err) {
            console.log("err in POST /frienship", err);
        }
    }
    return (
        <button onClick={submit}>
            {button} {name}
        </button>
    );
}
