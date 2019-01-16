import React, { Component } from "react";
import axios from "axios";

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
            zipcode: ""
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
                zipcode
            } = response.data[0];
            this.setState({
                application,
                email,
                img,
                displayName: org_display_name,
                org_id,
                username,
                zipcode
            });
        });
    };
    render() {
        return (
            <div>
                <img src={this.state.img} alt="avatar" width="100" />
                <h1>{this.state.displayName}</h1>
                <h3>{this.state.username}</h3>
                <h2>Zip Code: {this.state.zipcode}</h2>
                <h2>Email: {this.state.email}</h2>
            </div>
        );
    }
}
