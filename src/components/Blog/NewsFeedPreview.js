import React from "react";
import { Link } from "react-router-dom";
const NewsFeedPreview = props => {
    return (
        <div className="previewPost">
            <div className="postAvatar">
                <img src={props.img} alt="avatar" />
                <Link to={`/profile/org/${props.org_id}`}>
                    <h2>{props.username}</h2>
                </Link>
            </div>
            <p>{props.date}</p>
            <p>{props.time}</p>
            <h1 className="bold">{props.title}</h1>
            <p>{props.content}</p>
        </div>
    );
};

export default NewsFeedPreview;
