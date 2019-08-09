import React from "react";

export default function Profile(props) {
    return (
        <div className="profileBox">
            <div className="profileImg">{props.profilePic}</div>
            <div className="bioeditorBox">
                <h1>
                    {props.first} {props.last}
                </h1>
                {props.bioEditor}
            </div>
        </div>
    );
}
