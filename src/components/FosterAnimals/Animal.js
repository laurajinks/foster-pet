import React from "react";
import { Link } from "react-router-dom";
import "./animal.css";

const Animal = props => {
    return (
        <div className="animalContainer">
            <img src={props.img} alt="animal" />
            <h2>Name: {props.name}</h2>
            <p>Age: {props.age}</p>
            <p>Type: {props.animalType}</p>
            <p>Breed: {props.breed}</p>
            <p>Sex: {props.sex}</p>
            <p>Size: {props.size}</p>
            <p>Description: {props.description}</p>
            <Link to={`/profile/org/${props.org_id}`}>
                <p>Organization: {props.org_display_name}</p>
            </Link>
            {props.user_username && (
                <Link to={`/profile/user/${props.user_id}`}>
                    <p>Foster: {props.user_username}</p>
                </Link>
            )}
            {props.org_accept === false && <p>Pending...</p>}
            {props.removeAnimal && (
                <button onClick={() => props.removeAnimal(props.id)}>X</button>
            )}
            {props.applyToFosterAnimal && (
                <button
                    onClick={() =>
                        props.applyToFosterAnimal(props.id, props.org_id)
                    }
                >
                    Foster This Animal
                </button>
            )}
            {props.fosterAnimal && props.org_accept && (
                <div>
                    <p>Application Approved</p>
                    <button
                        onClick={() =>
                            props.fosterAnimal(props.id, props.user_id)
                        }
                    >
                        Accept Foster
                    </button>
                </div>
            )}
            {props.removeFosterParent && props.user_id !== null && (
                <button onClick={() => props.removeFosterParent(props.id)}>
                    Remove Foster Parent
                </button>
            )}
        </div>
    );
};

export default Animal;
