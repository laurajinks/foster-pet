import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class ApplicationDash extends Component {
    constructor() {
        super();
        this.state = {
            applications: null
        };
        axios
            .get(`/auth/org`)
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
                <Link to="/org/applications/create">
                    <button>Create Application</button>
                </Link>
                {!this.state.applications && <h1>No Applications To Review</h1>}
            </div>
        );
    }
}
