import React from "react";

const Organization = props => {
    return (
        <div className="resultBox">
            <div className="result">
                <img
                    className="resultThumb"
                    src={props.img}
                    alt={props.username}
                />
                <p>{props.displayName}</p>
                <p className="resultName">{props.username}</p>
                <p>Zip Code:{props.zipcode}</p>
                <p>Email: {props.email}</p>
                {/* <button className="applyBtn">Apply</button>
                <p>Status: Member</p> */}
            </div>
        </div>
    );
};

export default Organization;
