import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { friendslist, endFriendship, acceptFriendship } from "./actions";
import { Link } from "react-router-dom";
export default function Friends() {
    const dispatch = useDispatch();

    const myfriends = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == true)
    );
    const wannabes = useSelector(
        state =>
            state.users && state.users.filter(user => user.accepted == false)
    );
    console.log("friends: ", myfriends);
    useEffect(() => {
        dispatch(friendslist());
    }, []);
    if (!myfriends) {
        return null;
    }
    const currentfriends = (
        <div>
            {myfriends &&
                myfriends.map(friend => (
                    <div className="friendsbox" key="{friend.id}">
                        <Link to={"/user/" + friend.id}>
                            <img src={friend.image} />
                            <h1>
                                {friend.first_name} {friend.last_name}
                            </h1>
                        </Link>
                        <button
                            onClick={e => dispatch(endFriendship(friend.id))}
                        >
                            End Friendship
                        </button>
                    </div>
                ))}
        </div>
    );
    const wannabesfriends = (
        <div>
            {wannabes &&
                wannabes.map(wannabe => (
                    <div className="friendsbox" key="{wannabe.id}">
                        <Link to={"/user/" + wannabe.id}>
                            <img src={wannabe.image} />
                            <h1>
                                {wannabe.first_name} {wannabe.last_name}
                            </h1>
                        </Link>
                        <button
                            onClick={e =>
                                dispatch(acceptFriendship(wannabe.id))
                            }
                        >
                            Accept Friendship
                        </button>
                    </div>
                ))}
        </div>
    );
    return (
        <div className="friendslist" style={{ padding: "70px 20px 20px 20px" }}>
            {!myfriends.length && <div>You have no friends!</div>}
            <p>These people are currently your friends</p>
            {!!myfriends.length && currentfriends}

            <p>These people want to be your friends</p>
            {!wannabes.length && (
                <div>You don&apos;t have any friendship request</div>
            )}
            {!!wannabes.length && wannabesfriends}
        </div>
    );
}
