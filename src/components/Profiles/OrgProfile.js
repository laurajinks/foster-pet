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
            console.log(response.data);
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
            this.setState({
                application,
                email,
                img,
                displayName: org_display_name,
                org_id,
                username,
                zipcode,
                usState: us_state,
                org_bio
            });
        });
    };

    toggleEdit = () => {
        this.setState({ showEdits: !this.state.showEdits });
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
                </div>
                {this.state.allowEdits && (
                    <div>
                        <button onClick={this.toggleEdit}>Edit</button>
                        {this.state.showEdit && (
                            <EditOrgProfile
                                displayName={this.state.displayName}
                                email={this.state.email}
                                bio={this.state.bio}
                            />
                        )}
                    </div>
                )}
            </div>
        );
    }
}
