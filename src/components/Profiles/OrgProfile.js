import React, { Component } from "react";
import axios from "axios";
import EditOrgProfile from "./EditOrgProfile";

export default class OrgProfile extends Component {
    constructor() {
        super();
        this.state = {
            application: "",
            email: "",
            img: "",
            displayName: "",
            org_id: "",
            username: "",
            zipcode: "",
            noUser: false,
            allowEdits: false,
            showEdit: false,
            refresh: false
        };
    }

    loadData = () => {
        const { id } = this.props.match.params;
        axios
            .post("/api/org", { id })
            .then(response => {
                const {
                    application,
                    email,
                    img,
                    org_display_name,
                    org_id,
                    username,
                    zipcode,
                    us_state,
                    org_bio
                } = response.data[0];
                this.setState(
                    {
                        application,
                        email,
                        img,
                        displayName: org_display_name,
                        org_id,
                        username,
                        zipcode,
                        usState: us_state,
                        org_bio
                    },
                    () => {
                        axios.get("/auth/getcurrentuser").then(response => {
                            if (
                                response.data.id === this.state.org_id &&
                                response.data.isOrg === true
                            ) {
                                this.setState({ allowEdits: true });
                            }
                        });
                    }
                );
            })
            .catch(err => this.setState({ noUser: true }));
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

    submitEdit = (e, displayName, email, bio, url) => {
        e.preventDefault();
        axios
            .put("/auth/update/org", { displayName, email, bio, url })
            .then(() => {
                this.setState({ refresh: true, showEdit: false });
            });
    };

    render() {
        return (
            <>
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
                            <h2 className="bold">Email:</h2>{" "}
                            <h2>{this.state.email}</h2>
                        </div>
                        <div className="bio">
                            <h2 className="bold">State:</h2>
                            <h2>{this.state.usState}</h2>
                            <h2 className="bold">Zip Code:</h2>
                            <h2>{this.state.zipcode}</h2>
                            <h2 className="bold">About Us:</h2>
                            <p>{this.state.org_bio}</p>
                            {this.state.allowEdits && (
                                <button onClick={this.toggleEdit}>Edit</button>
                            )}
                        </div>
                        {this.state.showEdit && (
                            <EditOrgProfile
                                displayName={this.state.displayName}
                                username={this.state.username}
                                email={this.state.email}
                                bio={this.state.org_bio}
                                img={this.state.img}
                                toggleEdit={this.toggleEdit}
                                submitEdit={this.submitEdit}
                            />
                        )}
                    </div>
                )}
            </>
        );
    }
}
