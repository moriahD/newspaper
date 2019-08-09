import axios from "./axios";

export async function friendslist() {
    try {
        const { data } = await axios.get("/friends.json");
        console.log("data: ", data);
        return {
            type: "GET_ALL_FRIENDSLIST",
            users: data.rows
        };
    } catch (err) {
        console.log("err in get all friendslist", err);
    }
}

export async function endFriendship(id) {
    try {
        const { data } = await axios.post(`/friendshipList/${id}.json`, {
            button: "Unfriend"
        });

        return {
            type: "UNFRIEND",
            id
        };
    } catch (err) {
        console.log("err for endFriendship ", err);
    }
}

export async function acceptFriendship(id) {
    const { data } = await axios.post(`/friendshipList/${id}.json`, {
        button: "Accept Friend Request from"
    });
    console.log("data", data);
    return {
        type: "ACCEPT",
        id
    };
}
export async function chatMessages(msgs) {
    console.log("msgs:", msgs);
    return {
        type: "CHAT_MESSAGES",
        msgs
    };
}
export async function chatMessage(msg) {
    return {
        type: "CHAT_MESSAGE",
        msg
    };
}
export async function postMessages(wpmsgs) {
    try {
        const { data } = await axios.get("/wallpost.json");
        console.log("data: ", data);
        return {
            type: "WALLPOST_MESSAGES",
            wpmsgs: data
        };
    } catch (err) {
        console.log("err in get wall post msgs", err);
    }
}
export async function postMessage(receiver_id, wpmsg) {
    // console.log(
    //     "post msg is happening with receiver_id, wpmsg: ",
    //     receiver_id,
    //     wpmsg
    // );
    try {
        const { data } = await axios.post(`/wallpost.json`, {
            receiver_id,
            wpmsg
        });
        console.log("postMessage data:", data);
        return {
            type: "WALLPOST_MESSAGE",
            wpmsg: data
        };
    } catch (err) {
        console.log("err for posting wall post msg ", err);
    }
}
