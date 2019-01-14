import React from "react";

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
        </div>
    );
};

export default Animal;
