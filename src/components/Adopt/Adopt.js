import React, { Component } from "react";
import axios from "axios";
import AdoptableAnimal from "./AdoptableAnimal";

export default class Adopt extends Component {
    constructor() {
        super();

        this.state = {
            zipcode: "",
            animalType: "cat",
            age: "baby",
            sex: "female",
            results: []
        };
    }

    searchAdoptable = () => {
        const { zipcode, animalType, age, sex } = this.state;
        axios
            .get(
                `/api/search/adoptable/?search=${(zipcode,
                animalType,
                age,
                sex)}`
            )
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
                        <option value="baby">Baby</option>
                        <option value="young">Young</option>
                        <option value="adult">Adult</option>
                        <option value="senior">Senior</option>
                    </select>
                    Sex
                    <select name="sex" onChange={this.handleInputChange}>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                    </select>
                    <input type="submit" value="Submit" />
                </form>
                <AdoptableAnimal />
            </div>
        );
    }
}
