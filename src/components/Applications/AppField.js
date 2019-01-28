import React from "react";
import PropTypes from "prop-types";

const AppField = props => {
    return (
        <div className="appField">
            <p>{props.field}</p>
            <button onClick={() => props.removeField(props.field)}>X</button>
        </div>
    );
};

export default AppField;

AppField.propTypes = {
    field: PropTypes.string.isRequired,
    removeField: PropTypes.func.isRequired
};
