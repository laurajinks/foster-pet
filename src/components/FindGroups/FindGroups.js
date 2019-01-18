import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Organization from "./Organization";

export default class FindGroups extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            organizations: []
        };
    }

    componentDidMount = () => {
        axios
            .get("/api/organizations")
            .then(response => this.setState({ organizations: response.data }));
    };

    render() {
        axios
            .get(`/auth/user`)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    id: response.data.id
                });
            })
            .catch(err => {
                return this.props.history.push("/login");
            });
        const list = this.state.organizations.map(org => {
            return (
                <Organization
                    key={org.org_id}
                    user_id={this.state.user_id}
                    org_id={org.org_id}
                    org_username={org.username}
                    displayName={org.org_display_name}
                    email={org.email}
                    zipcode={org.zipcode}
                    img={org.img}
                    application={org.application}
                />
            );
        });
        return <div>{list}</div>;
    }
}
