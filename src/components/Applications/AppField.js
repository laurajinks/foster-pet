import React from "react";

const AppField = props => {
    return (
        <div className="appField">
            <p>{props.field}</p>
            <button onClick={() => props.removeField(props.field)}>X</button>
        </div>
    );
};

export default AppField;
