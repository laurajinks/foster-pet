import React from "react";
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
            <button onClick={() => props.removeAnimal(props.id)}>X</button>
        </div>
    );
};

export default Animal;
