import React, { Component } from "react";
import axios from "axios";

export default class UserProfile extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            id: ""
        };

        axios
            .get(`/auth/getcurrentuser`)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    id: response.data.id
                });
            })
            .catch(err => {
                console.log(err);
                this.props.history.push("/login");
            });
    }
    render() {
        return (
            <div>
                <h1>Test</h1>
            </div>
        );
    }
}
