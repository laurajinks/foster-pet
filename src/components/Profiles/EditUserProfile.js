import React, { Component } from "react";

export default class EditUserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: "",
            email: "",
            bio: ""
        };
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <form onSubmit={this.props.submitEdit}>
                    Display Name:
                    <input
                        type="text"
                        name="displayName"
                        defaultValue={this.props.displayName}
                        onChange={this.handleInputChange}
                    />
                    Email:
                    <input
                        type="text"
                        name="email"
                        defaultValue={this.props.email}
                        onChange={this.handleInputChange}
                    />
                    Bio:
                    <input
                        type="text"
                        name="bio"
                        defaultValue={this.props.bio}
                        onChange={this.handleInputChange}
                    />
                    <input type="submit" name="Submit Edits" />
                </form>
            </div>
        );
    }
}
