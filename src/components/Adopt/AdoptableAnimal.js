import React from "react";

const AdoptableAnimal = props => {
    return (
        <div className="animalContainer">
            <img src={props.img} alt={props.name} />
            <p className="resultName">Name: {props.name}</p>
            <p>Breed: {props.breed}</p>
            <p>Age: {props.age}</p>
            <p>Size: {props.size}</p>
            <p>Description: {props.description}</p>
            <button className="addNewBtn">More Info</button>
        </div>
    );
};

export default AdoptableAnimal;
