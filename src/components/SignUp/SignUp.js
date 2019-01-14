import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducers/authReducer";
import ImageUpload from "../ImageUpload/ImageUpload";

class SignUp extends Component {
    constructor() {
        super();
        this.state = {
            fosterSignUp: true,
            username: "",
            displayName: "",
            email: "",
            password: "",
            orgName: "",
            zipcode: "",
            image: null,
            url: ""
        };
    }

    showFoster = () => {
        this.setState({ fosterSignUp: true });
    };

    showOrganization = () => {
        this.setState({ fosterSignUp: false });
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image });
        }
    };

    handleUpload = () => {
        const { image } = this.state;
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
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
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => this.setState({ url }));
            }
        );
    };

    addUser = event => {
        event.preventDefault();
        const { username, displayName, password, email, url } = this.state;
        axios
            .post("/auth/register/user", {
                username,
                displayName,
                password,
                email,
                url
            })
            .then(response => {
                const { username, id, isOrg } = response.data;
                this.props.updateUser({
                    username: username,
                    id: id,
                    isOrg: isOrg
                });
                this.setState(
                    {
                        username: "",
                        displayName: "",
                        email: "",
                        password: "",
                        orgName: "",
                        zipcode: "",
                        image: null,
                        url: ""
                    },
                    this.props.history.push("/dashboard/user")
                );
            })
            .catch(err => alert(err));
    };

    addOrg = event => {
        event.preventDefault();
        const { username, orgName, password, email, zipcode, url } = this.state;
        axios
            .post("/auth/register/org", {
                username,
                orgName,
                password,
                email,
                zipcode,
                url
            })
            .then(response => {
                const { username, id, isOrg } = response.data;
                this.props.updateUser({
                    username: username,
                    id: id,
                    isOrg: isOrg
                });
                this.setState({
                    username: "",
                    displayName: "",
                    email: "",
                    password: "",
                    orgName: "",
                    zipcode: "",
                    image: null,
                    url: ""
                });
                this.props.history.push("/dashboard/org");
            })
            .catch(err => alert(err));
    };

    render() {
        return (
            <div>
                <button onClick={this.showFoster}>Register as Foster</button>
                <button onClick={this.showOrganization}>
                    Register as Organization
                </button>
                {this.state.fosterSignUp && (
                    <form onSubmit={this.addUser}>
                        Username{" "}
                        <input
                            type="text"
                            name="username"
                            onChange={this.handleInputChange}
                        />
                        Display Name{" "}
                        <input
                            type="text"
                            name="displayName"
                            onChange={this.handleInputChange}
                        />
                        Email{" "}
                        <input
                            type="text"
                            name="email"
                            onChange={this.handleInputChange}
                        />
                        Password{" "}
                        <input
                            type="text"
                            name="password"
                            onChange={this.handleInputChange}
                        />
                        <ImageUpload
                            handleFileChange={this.handleFileChange}
                            handleUpload={this.handleUpload}
                            url={this.state.url}
                        />
                        <input type="submit" value="Submit" />
                    </form>
                )}
                {!this.state.fosterSignUp && (
                    <form onSubmit={this.addOrg}>
                        Username{" "}
                        <input
                            type="text"
                            name="username"
                            onChange={this.handleInputChange}
                        />
                        Organization Name{" "}
                        <input
                            type="text"
                            name="orgName"
                            onChange={this.handleInputChange}
                        />
                        Email{" "}
                        <input
                            type="text"
                            name="email"
                            onChange={this.handleInputChange}
                        />
                        Zip Code{" "}
                        <input
                            type="text"
                            name="zipcode"
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
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(
    mapStateToProps,
    { updateUser }
)(SignUp);
