import React from "react";
const NewsFeedPreview = props => {
    return (
        <div className="previewPost">
            <img src={props.img} alt="avatar" />
            <h2>{props.username}</h2>
            <p>{props.date}</p>
            <p>{props.time}</p>
            <h1 className="bold">{props.title}</h1>
            <p>{props.content}</p>
        </div>
    );
};

export default NewsFeedPreview;
