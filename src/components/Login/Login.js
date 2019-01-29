import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { updateUser } from "../../ducks/reducers/authReducer";
// const url = "http://localhost:3001";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            fosterLogIn: true,
            username: "",
            password: ""
        };
    }

    //Toggle between Foster and Organization Log In forms

    showFoster = () => {
        this.setState({ fosterLogIn: true });
    };

    showOrganization = () => {
        this.setState({ fosterLogIn: false });
    };

    //

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    signInFoster = event => {
        event.preventDefault();
        const { username, password } = this.state;
        axios
            .post(`/auth/login/user`, { username, password })
            .then(response => {
                const { username, id, isOrg } = response.data;
                this.props.updateUser({
                    username: username,
                    id: id,
                    isOrg: isOrg
                });
                this.props.history.push("/dashboard/user");
            })
            .catch(err => alert(err.response.request.response));
    };

    signInOrg = event => {
        event.preventDefault();
        const { username, password } = this.state;
        axios
            .post(`/auth/login/org`, { username, password })
            .then(response => {
                const { username, id, isOrg } = response.data;
                this.props.updateUser({
                    username: username,
                    id: id,
                    isOrg: isOrg
                });
                this.props.history.push("/dashboard/org");
            })
            .catch(err => alert(err));
    };

    render() {
        return (
            <div className="homepage">
                <div className="loginSignUpContainer">
                    <div className="loginSignUp">
                        <div className="loginSignUpBtns">
                            <button onClick={this.showFoster}>
                                Foster Sign In
                            </button>
                            <button onClick={this.showOrganization}>
                                Organization Log In
                            </button>
                        </div>
                        {this.state.fosterLogIn && (
                            <form onSubmit={this.signInFoster}>
                                Foster Username{" "}
                                <input
                                    type="text"
                                    name="username"
                                    onChange={this.handleInputChange}
                                />
                                <br />
                                Password{" "}
                                <input
                                    type="password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                />{" "}
                                <br />
                                <input
                                    className="submit"
                                    type="submit"
                                    value="Submit"
                                />
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
                                <br />
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                />{" "}
                                <br />
                                <input
                                    className="submit"
                                    type="submit"
                                    value="Submit"
                                />
                            </form>
                        )}
                        <p>No Account?</p>
                        <Link to="/signup">
                            <button>Register</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    { updateUser }
)(Login);
