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
            allowEdits: false,
            showEdit: false
        };
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;
        axios.post("/api/org", { id }).then(response => {
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
        });
    };

    toggleEdit = () => {
        this.setState({ showEdit: !this.state.showEdit });
    };

    submitEdit = (e, displayName, email, bio) => {
        e.preventDefault();
        axios.put("/auth/update/org", { displayName, email, bio });
    };

    render() {
        return (
            <div className="profileContainer">
                <div className="profileContent">
                    <img src={this.state.img} alt="avatar" width="100" />
                    <h1>{this.state.displayName}</h1>
                    <h3>{this.state.username}</h3>
                    <h2>State: {this.state.usState}</h2>
                    <h2>Zip Code: {this.state.zipcode}</h2>
                    <h2>Email: {this.state.email}</h2>
                </div>
                <div className="bio">
                    <h2>About Us:</h2>
                    <p>{this.state.org_bio}</p>
                    {this.state.allowEdits && (
                        <button onClick={this.toggleEdit}>Edit</button>
                    )}
                </div>
                {this.state.showEdit && (
                    <EditOrgProfile
                        displayName={this.state.displayName}
                        email={this.state.email}
                        bio={this.state.bio}
                        toggleEdit={this.toggleEdit}
                    />
                )}
            </div>
        );
    }
}
