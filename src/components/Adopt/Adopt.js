import React, { Component } from "react";
import axios from "axios";
import AdoptableAnimal from "./AdoptableAnimal";

export default class Adopt extends Component {
    constructor() {
        super();

        this.state = {
            zipcode: "",
            animalType: "cat",
            age: "Baby",
            sex: "female",
            results: []
        };
    }

    searchAdoptable = event => {
        event.preventDefault();
        const { zipcode, animalType, age, sex } = this.state;
        const search = `&zipcode=${zipcode}&animal=${animalType}&age=${age}&sex=${sex}`;
        axios
            .get(`/api/search/adoptable/?=${search}`)
            .then(response => {
                this.setState({ results: response.data });
            })
            .catch(err => console.log(err));
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.searchAdoptable}>
                    Zip Code
                    <input
                        type="text"
                        name="zipcode"
                        onChange={this.handleInputChange}
                    />
                    Animal Type
                    <select name="animalType" onChange={this.handleInputChange}>
                        <option value="cat">Cat</option>
                        <option value="dog">Dog</option>
                    </select>
                    Age
                    <select name="age" onChange={this.handleInputChange}>
                        <option value="Baby">Baby</option>
                        <option value="Young">Young</option>
                        <option value="Adult">Adult</option>
                        <option value="Senior">Senior</option>
                    </select>
                    Sex
                    <select name="sex" onChange={this.handleInputChange}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                    <input type="submit" value="Submit" />
                </form>
                {this.state.results.map(result => (
                    <AdoptableAnimal
                        key={result.id}
                        id={result.id}
                        name={result.name}
                        img={result.img}
                        size={result.size}
                        description={result.description}
                        breed={result.breed}
                        age={result.age}
                        shelterId={result.shelterId}
                    />
                ))}
            </div>
        );
    }
}
