import React, { Component } from "react";
import axios from "axios";
import { storage } from "../../firebase";
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducers/authReducer";
import ImageUpload from "../ImageUpload/ImageUpload";
// const apiurl = "http://localhost:3001";

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
            usState: "Alabama",
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

    addUser = event => {
        event.preventDefault();
        const { username, displayName, password, email, url } = this.state;
        axios
            .post(`auth/register/user`, {
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
        const {
            username,
            orgName,
            password,
            email,
            zipcode,
            usState,
            url
        } = this.state;
        axios
            .post(`/auth/register/org`, {
                username,
                orgName,
                password,
                email,
                zipcode,
                usState,
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
                    usState: "Alabama",
                    image: null,
                    url: ""
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
                                Register as Foster
                            </button>
                            <button onClick={this.showOrganization}>
                                Register as Organization
                            </button>
                        </div>
                        {this.state.fosterSignUp && (
                            <form onSubmit={this.addUser}>
                                Username{" "}
                                <input
                                    type="text"
                                    name="username"
                                    onChange={this.handleInputChange}
                                />
                                <br />
                                Display Name{" "}
                                <input
                                    type="text"
                                    name="displayName"
                                    onChange={this.handleInputChange}
                                />
                                <br />
                                Email{" "}
                                <input
                                    type="text"
                                    name="email"
                                    onChange={this.handleInputChange}
                                />
                                <br />
                                Password{" "}
                                <input
                                    type="text"
                                    name="password"
                                    onChange={this.handleInputChange}
                                />
                                <br />
                                <ImageUpload
                                    handleFileChange={this.handleFileChange}
                                    handleUpload={this.handleUpload}
                                    url={this.state.url}
                                />
                                <br />
                                <input
                                    className="submit"
                                    type="submit"
                                    value="Submit"
                                />
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
                                <br />
                                Organization Name{" "}
                                <input
                                    type="text"
                                    name="orgName"
                                    onChange={this.handleInputChange}
                                />
                                <br />
                                Email{" "}
                                <input
                                    type="text"
                                    name="email"
                                    onChange={this.handleInputChange}
                                />
                                <br />
                                State{" "}
                                <select
                                    name="usState"
                                    onChange={this.handleInputChange}
                                >
                                    <option value="Alabama">Alabama</option>
                                    <option value="Alaska">Alaska</option>
                                    <option value="Arizona">Arizona</option>
                                    <option value="Arkansas">Arkansas</option>
                                    <option value="California">
                                        California
                                    </option>
                                    <option value="Colorado">Colorado</option>
                                    <option value="Connecticut">
                                        Connecticut
                                    </option>
                                    <option value="Delaware">Delaware</option>
                                    <option value="Georgia">Georgia</option>
                                    <option value="Florida">Florida</option>
                                    <option value="Hawaii">Hawaii</option>
                                    <option value="Idaho">Idaho</option>
                                    <option value="Illinois">Illinois</option>
                                    <option value="Indiana">Indiana</option>
                                    <option value="Iowa">Iowa</option>
                                    <option value="Kansas">Kansas</option>
                                    <option value="Kentucky">Kentucky</option>
                                    <option value="Louisiana">Louisiana</option>
                                    <option value="Maine">Maine</option>
                                    <option value="Maryland">Maryland</option>
                                    <option value="Massachusetts">
                                        Massachusetts
                                    </option>
                                    <option value="Michigan">Michigan</option>
                                    <option value="Minnesota">Minnesota</option>
                                    <option value="Mississippi">
                                        Mississippi
                                    </option>
                                    <option value="Missouri">Missouri</option>
                                    <option value="Montana">Montana</option>
                                    <option value="Nebraska">Nebraska</option>
                                    <option value="Nevada">Nevada</option>
                                    <option value="New Hampshire">
                                        New Hampshire
                                    </option>
                                    <option value="New Jersey">
                                        New Jersey
                                    </option>
                                    <option value="New Mexico">
                                        New Mexico
                                    </option>
                                    <option value="New York">New York</option>
                                    <option value="North Carolina">
                                        North Carolina
                                    </option>
                                    <option value="North Dakota">
                                        North Dakota
                                    </option>
                                    <option value="Ohio">Ohio</option>
                                    <option value="Oklahoma">Oklahoma</option>
                                    <option value="Oregon">Oregon</option>
                                    <option value="Pennsylvania">
                                        Pennsylvania
                                    </option>
                                    <option value="Rhode Island">
                                        Rhode Island
                                    </option>
                                    <option value="South Carolina">
                                        South Carolina
                                    </option>
                                    <option value="South Dakota">
                                        South Dakota
                                    </option>
                                    <option value="Tennessee">Tennessee</option>
                                    <option value="Texas">Texas</option>
                                    <option value="Utah">Utah</option>
                                    <option value="Vermont">Vermont</option>
                                    <option value="Virginia">Virginia</option>
                                    <option value="Washington">
                                        Washington
                                    </option>
                                    <option value="West Virginia">
                                        West Virginia
                                    </option>
                                    <option value="Wisconsin">Wisconsin</option>
                                    <option value="Wyoming">Wyoming</option>
                                </select>
                                <br />
                                Zip Code{" "}
                                <input
                                    type="text"
                                    name="zipcode"
                                    onChange={this.handleInputChange}
                                />
                                <br />
                                Password{" "}
                                <input
                                    className="submit"
                                    type="text"
                                    name="password"
                                    onChange={this.handleInputChange}
                                />
                                <ImageUpload
                                    handleFileChange={this.handleFileChange}
                                    handleUpload={this.handleUpload}
                                    url={this.state.url}
                                />
                                <br />
                                <input type="submit" value="Submit" />
                            </form>
                        )}
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
)(SignUp);
