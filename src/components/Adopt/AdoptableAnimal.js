import React, { Component } from "react";
import axios from "axios";

export default class AdoptableAnimal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shelter: "",
            city: "",
            usState: "",
            name: "",
            animalType: "",
            id: ""
        };
    }

    formatString = str => {
        const newStr = str
            .toLowerCase()
            .replace(/['",]/g, "")
            .replace(/[-_!@#$%^&*]/g, " ")
            .split(" ")
            .join("-");
        return newStr;
    };

    componentDidMount = () => {
        const { shelterId } = this.props;
        const id = shelterId.toLowerCase();
        const city = this.formatString(this.props.city);
        const animalType = this.formatString(this.props.animalType);
        const usState = this.formatString(this.props.usState);
        const name = this.formatString(this.props.name);
        axios.post("/api/search/shelter", { shelterId }).then(response => {
            const shelter = response.data
                .toLowerCase()
                .replace(/[-_'"!@#$%^&*]/g, " ")
                .replace(/['",]/g, "")
                .split(" ")
                .filter(character => character !== "")
                .join("-");
            this.setState({ shelter });
        });
        this.setState({ city, usState, name, animalType, id });
    };

    render() {
        return (
            <div className="animalContainer">
                <a
                    href={`https://www.petfinder.com/${this.state.animalType}/${
                        this.state.name
                    }-${this.props.id}/${this.state.usState}/${
                        this.state.city
                    }/${this.state.shelter}-${this.state.id}/`}
                >
                    <img src={this.props.img} alt={this.props.name} />
                </a>
                <p className="resultName">Name: {this.props.name}</p>
                <p>Breed: {this.props.breed}</p>
                <p>Age: {this.props.age}</p>
                <p>Size: {this.props.size}</p>
                <p>Description: {this.props.description}</p>
                <a
                    href={`https://www.petfinder.com/${this.state.animalType}/${
                        this.state.name
                    }-${this.props.id}/${this.state.usState}/${
                        this.state.city
                    }/${this.state.shelter}-${this.state.id}/`}
                >
                    <button className="addNewBtn">More Info</button>
                </a>
            </div>
        );
    }
}
