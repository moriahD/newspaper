import React from "react";

export default function({ image, first, last, onClick }) {
    return (
        <div>
            <img src={image} alt={`${first} ${last}`} onClick={onClick} />
        </div>
    );
}
