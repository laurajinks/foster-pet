import React, { Component } from "react";

const ImageUpload = props => {
    return (
        <div>
            <input type="file" onChange={props.handleFileChange} />
            <button onClick={props.handleUpload}>Upload Avatar</button>
            <img
                src={props.url || "http://via.placeholder.com/70x70"}
                alt="Uploaded img"
                height="70"
                width="70"
            />
        </div>
    );
};

export default ImageUpload;
