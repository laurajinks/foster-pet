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

    signInFoster = event => {
        event.preventDefault();
        const { username, password } = this.state;
        axios
            .post("/auth/login/user", { username, password })
            .then(() => {
                this.props.history.push("/dashboard/user");
            })
            .catch(err => alert(err.response.request.response));
    };

    signInOrg = event => {
        event.preventDefault();
        const { username, password } = this.state;
        axios
            .post("/auth/login/org", { username, password })
            .then(() => {
                this.props.history.push("/dashboard/org");
            })
            .catch(err => alert(err.response.request.response));
    };

    render() {
        return (
            <div>
                <button onClick={this.showFoster}>Foster Sign In</button>
                <button onClick={this.showOrganization}>
                    Organization Log In
                </button>
                {this.state.fosterLogIn && (
                    <form onSubmit={this.signInFoster}>
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
                    <form onSubmit={this.signInOrg}>
                        Organization Username
                        <input
                            type="text"
                            name="username"
                            onChange={this.handleInputChange}
                        />
                        Password
                        <input
                            type="text"
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
