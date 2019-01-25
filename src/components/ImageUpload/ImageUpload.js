import React from "react";

const ImageUpload = props => {
    return (
        <div className="imageUpload">
            <input type="file" onChange={props.handleFileChange} />
            <button onClick={props.handleUpload}>Upload Image</button>
            <img
                src={
                    props.url ||
                    props.newImg ||
                    props.prevImg ||
                    "http://via.placeholder.com/70x70"
                }
                alt="Uploaded img"
                height="70"
                width="70"
            />
        </div>
    );
};

export default ImageUpload;
