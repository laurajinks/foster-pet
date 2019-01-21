import React from "react";
const NewsFeedPreview = props => {
    return (
        <div className="previewPost">
            <img src={props.img} alt="avatar" />
            <p>{props.username}</p>
            <p>{props.date}</p>
            <p>{props.time}</p>
            <h1>{props.title}</h1>
            <p>{props.content}</p>
        </div>
    );
};

export default NewsFeedPreview;
