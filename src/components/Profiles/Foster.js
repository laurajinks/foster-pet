import React from "react";

const Foster = props => {
    return (
        <div className="smallAnimalContainer">
            <img src={props.img} alt="avatar" width="100" />
            <h2>{props.displayName}</h2>
            <p>{props.username}</p>
            <p>{props.email}</p>
            <button onClick={() => props.removeFoster(props.user_id)}>
                Remove From Group
            </button>
        </div>
    );
};

export default Foster;
