import React, { Component } from "react";
import axios from "axios";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            fosterLogIn: true,
            username: "",
            password: ""
        };
    }

    showFoster = () => {
        this.setState({ fosterLogIn: true });
    };

    showOrganization = () => {
        this.setState({ fosterLogIn: false });
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div>
                <button onClick={this.showFoster}>Foster Sign In</button>
                <button onClick={this.showOrganization}>
                    Organization Log In
                </button>
                {this.state.fosterLogIn && (
                    <form>
                        Foster Username{" "}
                        <input
                            type="text"
                            name="username"
                            onChange={this.handleInputChange}
                        />
                        Password{" "}
                        <input
                            type="text"
                            name="password"
                            onChange={this.handleInputChange}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                )}
                {!this.state.fosterLogIn && (
                    <form>
                        Organization Username
                        <input
                            type="text"
                            name="username"
                            onChange={this.handleInputChange}
                        />
                        Password{" "}
                        <input
                            type="submit"
                            name="password"
                            onChange={this.handleInputChange}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                )}
            </div>
        );
    }
}
