import React, { Component } from "react";
import axios from "axios";
import Organization from "./Organization";

export default class FindGroups extends Component {
    constructor() {
        super();
        this.state = {
            user_id: "",
            usState: "Alabama",
            organizations: []
        };
        axios.get("/auth/getcurrentuser").then(response => {
            if (response.data.isOrg === true || !response.data) {
                return this.props.history.push("/login");
            } else {
                this.setState({
                    username: response.data.username,
                    user_id: response.data.id
                });
            }
        });
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    search = () => {
        const { usState } = this.state;
        axios
            .post("/api/organizations", { usState })
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
        return (
            <div>
                <div className="search">
                    <h1 className="title">Foster Groups</h1>
                    <p> Search By State</p>

                    <select name="usState" onChange={this.handleInputChange}>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="Arkansas">Arkansas</option>
                        <option value="California">California</option>
                        <option value="Colorado">Colorado</option>
                        <option value="Connecticut">Connecticut</option>
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
                        <option value="Massachusetts">Massachusetts</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Minnesota">Minnesota</option>
                        <option value="Mississippi">Mississippi</option>
                        <option value="Missouri">Missouri</option>
                        <option value="Montana">Montana</option>
                        <option value="Nebraska">Nebraska</option>
                        <option value="Nevada">Nevada</option>
                        <option value="New Hampshire">New Hampshire</option>
                        <option value="New Jersey">New Jersey</option>
                        <option value="New Mexico">New Mexico</option>
                        <option value="New York">New York</option>
                        <option value="North Carolina">North Carolina</option>
                        <option value="North Dakota">North Dakota</option>
                        <option value="Ohio">Ohio</option>
                        <option value="Oklahoma">Oklahoma</option>
                        <option value="Oregon">Oregon</option>
                        <option value="Pennsylvania">Pennsylvania</option>
                        <option value="Rhode Island">Rhode Island</option>
                        <option value="South Carolina">South Carolina</option>
                        <option value="South Dakota">South Dakota</option>
                        <option value="Tennessee">Tennessee</option>
                        <option value="Texas">Texas</option>
                        <option value="Utah">Utah</option>
                        <option value="Vermont">Vermont</option>
                        <option value="Virginia">Virginia</option>
                        <option value="Washington">Washington</option>
                        <option value="West Virginia">West Virginia</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Wyoming">Wyoming</option>
                    </select>
                    <button onClick={this.search}>Search</button>
                </div>
                <div className="groupListContainer">{list}</div>
            </div>
        );
    }
}
