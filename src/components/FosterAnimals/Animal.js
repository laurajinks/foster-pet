import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Animal extends Component {
    constructor() {
        super();

        this.state = {
            refresh: false,
            showConfirmation: false,
            showEdit: false,
            name: "",
            animalType: "Cat",
            age: "",
            sex: "",
            breed: "",
            size: "",
            description: ""
        };
    }

    loadData = () => {
        this.setState({
            name: this.props.name,
            animalType: this.props.animalType,
            age: this.props.age,
            sex: this.props.sex,
            breed: this.props.breed,
            size: this.props.size,
            description: this.props.description,
            refresh: false
        });
    };

    componentDidMount = () => {
        this.loadData();
    };

    componentDidUpdate = () => {
        if (this.state.refresh === true) {
            this.loadData();
        }
    };

    toggleConfirmation = () => {
        this.setState({ showConfirmation: !this.state.showConfirmation });
    };

    toggleEdit = () => {
        this.setState({ showEdit: !this.state.showEdit });
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitEdit = event => {
        event.preventDefault();
        const {
            name,
            animalType,
            age,
            sex,
            breed,
            size,
            description
        } = this.state;
        const { id } = this.props;
        axios
            .put(`/api/animals`, {
                id,
                name,
                animalType,
                age,
                sex,
                breed,
                size,
                description
            })
            .then(() => {
                this.setState({ showEdit: false }, this.props.toggleRefresh());
            })

            .catch(err => alert(err));
    };

    render() {
        return (
            <div className="animalContainer">
                <img src={this.props.img} alt="animal" />
                <h2>Name: {this.props.name}</h2>
                <p>Age: {this.props.age}</p>
                <p>Type: {this.props.animalType}</p>
                <p>Breed: {this.props.breed}</p>
                <p>Sex: {this.props.sex}</p>
                <p>Size: {this.props.size}</p>
                <p>Description: {this.props.description}</p>
                {!this.props.allowEdit && (
                    <>
                        <Link to={`/profile/org/${this.props.org_id}`}>
                            <p>Organization: {this.props.org_display_name}</p>
                        </Link>
                        {this.props.user_username && (
                            <Link to={`/profile/user/${this.props.user_id}`}>
                                <p>Foster: {this.props.user_username}</p>
                            </Link>
                        )}
                    </>
                )}
                {this.props.allowEdit && (
                    <div>
                        {!this.state.showEdit && (
                            <button onClick={this.toggleEdit}>Edit</button>
                        )}
                        {this.state.showEdit && (
                            <div className="editAnimal">
                                <button onClick={this.toggleEdit}>
                                    Cancel
                                </button>
                                <form onSubmit={this.submitEdit}>
                                    Name:
                                    <input
                                        type="text"
                                        name="name"
                                        defaultValue={this.props.name}
                                        onChange={this.handleInputChange}
                                    />
                                    Animal Type:
                                    <select
                                        name="animalType"
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="Cat">Cat</option>
                                        <option value="Dog">Dog</option>
                                    </select>
                                    Age:
                                    <select
                                        name="age"
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="Baby">Baby</option>
                                        <option value="Young">Young</option>
                                        <option value="Adult">Adult</option>
                                        <option value="Senior">Senior</option>
                                    </select>
                                    Sex:
                                    <select
                                        name="sex"
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="Female">Female</option>
                                        <option value="Male">Male</option>
                                    </select>
                                    Breed:
                                    <input
                                        type="text"
                                        name="breed"
                                        defaultValue={this.props.breed}
                                        onChange={this.handleInputChange}
                                    />
                                    Size:
                                    <select
                                        name="size"
                                        onChange={this.handleInputChange}
                                    >
                                        <option value="Extra Small">
                                            Extra Small
                                        </option>
                                        <option value="Small">Small</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Large">Large</option>
                                        <option value="Extra Large">
                                            Extra Large
                                        </option>
                                    </select>
                                    Description:
                                    <input
                                        type="text"
                                        name="description"
                                        defaultValue={this.props.description}
                                        onChange={this.handleInputChange}
                                    />
                                    <button onClick={this.submitEdit}>
                                        Submit Edit
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                )}
                {this.props.org_accept === false && (
                    <p className="status">Pending Approval</p>
                )}
                {this.props.removeAnimal &&
                    this.state.showConfirmation === false && (
                        <button onClick={this.toggleConfirmation}>
                            Delete Animal
                        </button>
                    )}
                {this.props.removeAnimal &&
                    this.state.showConfirmation === true && (
                        <div>
                            <button onClick={this.toggleConfirmation}>
                                Cancel
                            </button>
                            <button
                                onClick={() =>
                                    this.props.removeAnimal(this.props.id)
                                }
                            >
                                Confirm Delete Animal
                            </button>
                        </div>
                    )}
                {this.props.applyToFosterAnimal && (
                    <button
                        onClick={() =>
                            this.props.applyToFosterAnimal(
                                this.props.id,
                                this.props.org_id
                            )
                        }
                    >
                        Foster This Animal
                    </button>
                )}
                {this.props.fosterAnimal && this.props.org_accept && (
                    <div>
                        <p className="status">Application Approved</p>
                        <button
                            onClick={() =>
                                this.props.fosterAnimal(
                                    this.props.id,
                                    this.props.user_id
                                )
                            }
                        >
                            Accept Foster
                        </button>
                    </div>
                )}
                {this.props.removeFosterParent &&
                    this.props.user_id !== null && (
                        <button
                            onClick={() =>
                                this.props.removeFosterParent(this.props.id)
                            }
                        >
                            Remove Foster Parent
                        </button>
                    )}
            </div>
        );
    }
}
