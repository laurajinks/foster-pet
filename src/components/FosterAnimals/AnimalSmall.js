import React from "react";
import { Link } from "react-router-dom";
import "./animal.css";

const AnimalSmall = props => {
    return (
        <div className="animalContainer">
            <img src={props.img} alt="animal" />
            <h2>Name: {props.name}</h2>
            <Link to={`/profile/org/${props.org_id}`}>
                <p>Organization: {props.org_display_name}</p>
            </Link>
        </div>
    );
};

export default AnimalSmall;
