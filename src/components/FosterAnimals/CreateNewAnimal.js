import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { storage } from "../../firebase";
import ImageUpload from "../ImageUpload/ImageUpload";

export default class CreateNewAnimal extends Component {
    constructor() {
        super();
        this.state = {
            org_id: "",
            name: "",
            animalType: "Cat",
            age: "Baby",
            sex: "Female",
            breed: "",
            size: "Extra Small",
            description: "",
            image: null,
            url: ""
        };
        axios.get("/auth/getcurrentuser").then(response => {
            if (response.data.isOrg === false || !response.data) {
                return this.props.history.push("/login");
            } else {
                this.setState({
                    username: response.data.username,
                    id: response.data.id
                });
            }
        });
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image });
        }
    };

    handleUpload = event => {
        event.preventDefault();
        const { image } = this.state;
        const randomStr = Math.floor(Math.random() * 1000000) + image.name;
        const uploadTask = storage.ref(`images/${randomStr}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                //progress function
            },
            error => {
                //error function
                console.log(error);
            },
            () => {
                //complete function
                storage
                    .ref("images")
                    .child(randomStr)
                    .getDownloadURL()
                    .then(url => this.setState({ url }));
            }
        );
    };

    addAnimal = event => {
        event.preventDefault();
        const {
            org_id,
            name,
            animalType,
            age,
            sex,
            breed,
            size,
            description,
            url
        } = this.state;
        axios
            .post(`/api/animals`, {
                org_id,
                name,
                animalType,
                age,
                sex,
                breed,
                size,
                description,
                url
            })
            .then(response => {
                this.setState({
                    org_id: "",
                    name: "",
                    animalType: "",
                    age: "",
                    sex: "",
                    breed: "",
                    size: "",
                    description: "",
                    url: ""
                });
                this.props.history.push("/org/animals");
            })
            .catch(err => alert(err));
    };

    render() {
        return (
            <>
                <form onSubmit={this.addAnimal}>
                    Name:
                    <input
                        type="text"
                        name="name"
                        onChange={this.handleInputChange}
                    />
                    Animal Type:
                    <select name="animalType" onChange={this.handleInputChange}>
                        <option value="Cat">Cat</option>
                        <option value="Dog">Dog</option>
                    </select>
                    Age:
                    <select name="age" onChange={this.handleInputChange}>
                        <option value="Baby">Baby</option>
                        <option value="Young">Young</option>
                        <option value="Adult">Adult</option>
                        <option value="Senior">Senior</option>
                    </select>
                    Sex:
                    <select name="sex" onChange={this.handleInputChange}>
                        <option value="Female">Female</option>
                        <option value="Male">Male</option>
                    </select>
                    Breed:
                    <input
                        type="text"
                        name="breed"
                        onChange={this.handleInputChange}
                    />
                    Size:
                    <select name="size" onChange={this.handleInputChange}>
                        <option value="Extra Small">Extra Small</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                        <option value="Extra Large">Extra Large</option>
                    </select>
                    Description:
                    <input
                        type="text"
                        name="description"
                        onChange={this.handleInputChange}
                    />
                    <ImageUpload
                        handleFileChange={this.handleFileChange}
                        handleUpload={this.handleUpload}
                        url={this.state.url}
                    />
                    <input type="submit" value="Submit" />
                </form>
            </>
        );
    }
}
