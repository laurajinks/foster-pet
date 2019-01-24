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
            orgs: [],
            animalCount: 0,
            allowEdits: false,
            showEdit: false,
            noUser: false,
            refresh: false
        };
    }

    loadData = () => {
        const { id } = this.props.match.params;

        //get user data from param id, check to see if user is the same as user on session
        axios
            .post("/api/user", { id })
            .then(response => {
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

        //Get organization display names from groups user is a member of
        axios.post("/api/memberships", { id }).then(response => {
            const organizationList = response.data.map(
                obj => obj.org_display_name
            );
            this.setState({ orgs: organizationList.join(",") });
        });

        axios.post("/api/animalcount", { id }).then(response => {
            const num = response.data[0].count;
            this.setState({ animalCount: +num });
        });
    };

    componentDidMount = () => {
        this.loadData();
    };

    componentDidUpdate = () => {
        if (this.state.refresh === true) {
            this.loadData();
            this.setState({ refresh: false });
        }
    };

    toggleEdit = () => {
        this.setState({ showEdit: !this.state.showEdit });
    };

    submitEdit = (e, displayName, email, bio) => {
        e.preventDefault();
        axios.put("/auth/update/user", { displayName, email, bio }).then(() => {
            this.setState({ refresh: true, showEdit: false });
        });
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
                            <h1 className="title">{this.state.displayName}</h1>
                            <h3>{this.state.username}</h3>
                            <h2>
                                <span className="bold">Email:</span>{" "}
                                {this.state.email}
                            </h2>
                        </div>
                        <div className="bio">
                            <h2 className="bold">Current Organizations:</h2>
                            <h2>{this.state.orgs}</h2>

                            <h2 className="bold">Current Animals:</h2>

                            <h2>{this.state.animalCount}</h2>
                            <h2 className="bold">Bio:</h2>
                            <h2>{this.state.user_bio}</h2>
                        </div>
                        {this.state.allowEdits && (
                            <button onClick={this.toggleEdit}>Edit</button>
                        )}
                        {this.state.showEdit && (
                            <EditUserProfile
                                displayName={this.state.displayName}
                                email={this.state.email}
                                bio={this.state.user_bio}
                                submitEdit={this.submitEdit}
                                toggleEdit={this.toggleEdit}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}
