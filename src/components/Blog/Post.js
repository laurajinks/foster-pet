import React from "react";

const Post = props => {
    return (
        <div>
            <img src={props.img} alt="avatar" />
            <p>{props.username}</p>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </div>
    );
};

export default Post;
