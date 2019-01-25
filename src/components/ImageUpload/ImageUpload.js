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
                    "https://firebasestorage.googleapis.com/v0/b/animal-foster-project.appspot.com/o/images%2Favatar_placeholder_small.png?alt=media&token=13f75385-412b-4ac1-888d-c0fd597f28a7"
                }
                alt="Uploaded img"
                height="70"
                width="70"
            />
        </div>
    );
};

export default ImageUpload;
