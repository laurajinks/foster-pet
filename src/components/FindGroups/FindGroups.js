import React, { Component } from "react";
import axios from "axios";
import Organization from "./Organization";

export default class FindGroups extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            organizations: []
        };
        axios
            .get(`/auth/user`)
            .then(response => {
                this.setState({
                    user_id: response.data.id
                });
            })
            .catch(err => {
                console.log(err);
                this.props.history.push("/login");
            });
    }

    componentDidMount = () => {
        axios
            .get("/api/organizations")
            .then(response => this.setState({ organizations: response.data }));
    };

    render() {
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
