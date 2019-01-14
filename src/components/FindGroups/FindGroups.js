import React, { Component } from "react";
import axios from "axios";
import Organization from "./Organization";

export default class FindGroups extends Component {
    constructor() {
        super();
        this.state = {
            organizations: []
        };
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
                    id={org.org_id}
                    username={org.username}
                    displayName={org.displayName}
                    zipcode={org.zipcode}
                    img={org.img}
                    appliation={org.application}
                />
            );
        });
        return <div>{list}</div>;
    }
}
