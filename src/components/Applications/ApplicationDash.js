import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Application from "./Application";

export default class ApplicationDash extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            applications: []
        };
        axios
            .get(`/auth/org`)
            .then(response => {
                console.log(response.data);
                this.setState({
                    id: response.data.id
                });
            })
            .catch(err => {
                console.log(err);
                this.props.history.push("/login");
            });
    }

    componentDidMount = () => {
        axios
            .post("/api/applications/org")
            .then(response => {
                console.log(response);
                this.setState({ applications: response.data });
            })
            .catch(err => console.log(err));
    };

    acceptApp = (org_id, user_id, key) => {
        axios.post("/api/members", { org_id, user_id });
        //

        axios.delete(`/api/applications/${key}`);
    };

    denyApp = key => {
        axios.delete(`/api/applications/${key}`);
    };

    render() {
        const apps = this.state.applications.map(app => {
            return (
                <Application
                    key={app.application_id}
                    org_id={app.org_id}
                    user_id={app.user_id}
                    content={app.app_content}
                />
            );
        });
        return (
            <div>
                <Link to="/org/applications/create">
                    <button>Create Application</button>
                </Link>
                {!this.state.applications && <h1>No Applications To Review</h1>}
                {apps}
            </div>
        );
    }
}
