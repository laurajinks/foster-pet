import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./animal.css";

export default class Animal extends Component {
    constructor() {
        super();

        this.state = {
            showConfirmation: false
        };
    }

    toggleConfirmation = () => {
        this.setState({ showConfirmation: !this.state.showConfirmation });
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
                <Link to={`/profile/org/${this.props.org_id}`}>
                    <p>Organization: {this.props.org_display_name}</p>
                </Link>
                {this.props.user_username && (
                    <Link to={`/profile/user/${this.props.user_id}`}>
                        <p>Foster: {this.props.user_username}</p>
                    </Link>
                )}
                {this.props.org_accept === false && <p>Pending...</p>}
                {this.props.removeAnimal &&
                    this.state.showConfirmation === false && (
                        <button onClick={this.toggleConfirmation}>
                            Delete Animal
                        </button>
                    )}
                {this.props.removeAnimal &&
                    this.state.showConfirmation === true && (
                        <button
                            onClick={() =>
                                this.props.removeAnimal(this.props.id)
                            }
                        >
                            Confirm Delete Animal
                        </button>
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
                        <p>Application Approved</p>
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
