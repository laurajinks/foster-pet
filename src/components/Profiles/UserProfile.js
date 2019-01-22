import React, { Component } from "react";
import axios from "axios";
import EditUserProfile from "./EditUserProfile";

export default class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            img: "",
            displayName: "",
            user_id: "",
            username: "",
            user_bio: "",
            allowEdits: false,
            showEdit: false,
            noUser: false
        };
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;
        axios
            .post("/api/user", { id })
            .then(response => {
                console.log(response);
                const {
                    email,
                    img,
                    user_display_name,
                    user_id,
                    username,
                    user_bio
                } = response.data[0];
                this.setState(
                    {
                        email,
                        img,
                        displayName: user_display_name,
                        user_id,
                        username,
                        user_bio
                    },
                    () => {
                        axios.get("/auth/getcurrentuser").then(response => {
                            if (
                                response.data.id === this.state.user_id &&
                                response.data.isOrg === false
                            ) {
                                this.setState({ allowEdits: true });
                            }
                        });
                    }
                );
            })

            .catch(err => this.setState({ noUser: true }));
    };

    toggleEdit = () => {
        this.setState({ showEdit: !this.state.showEdit });
    };

    submitEdit = e => {
        e.preventDefault();
    };

    render() {
        return (
            <div>
                {this.state.noUser && (
                    <div className="profileContainer">
                        <h1>No User To Display</h1>
                    </div>
                )}
                {!this.state.noUser && (
                    <div className="profileContainer">
                        <div className="profileContent">
                            <img
                                src={this.state.img}
                                alt="avatar"
                                width="100"
                            />
                            <h1>{this.state.displayName}</h1>
                            <h3>{this.state.username}</h3>
                            <h2>Email: {this.state.email}</h2>
                        </div>
                        <div className="bio">
                            <h2> Current Organizations:</h2>
                            <h2>Current Animals:</h2>
                            <h2>Bio:</h2>
                            <p>{this.state.user_bio}</p>
                        </div>
                        {this.state.allowEdits && (
                            <div>
                                <button onClick={this.toggleEdit}>Edit</button>
                                {this.state.showEdit && (
                                    <EditUserProfile
                                        displayName={this.state.displayName}
                                        email={this.state.email}
                                        bio={this.state.bio}
                                        submitEdit={this.submitEdit}
                                    />
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        );
    }
}
