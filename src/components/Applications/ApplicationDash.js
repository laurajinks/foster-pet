import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Application from "./Application";
import AnimalApplication from "./AnimalApplication";

export default class ApplicationDash extends Component {
    constructor() {
        super();
        this.state = {
            id: "",
            applications: [],
            animalApplications: []
        };
        axios
            .get(`/auth/org`)
            .then(response => {
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
                this.setState({ applications: response.data });
            })
            .catch(err => console.log(err));
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state !== prevState) {
            axios
                .post("/api/applications/org")
                .then(response => {
                    this.setState({ applications: response.data });
                })
                .catch(err => console.log(err));
        }
    };

    acceptApp = async (org_id, user_id, id) => {
        await axios.post("/api/members", { org_id, user_id });
        axios.delete(`/api/applications/${id}`);
    };

    denyApp = async id => {
        await axios.delete(`/api/applications/${id}`);
    };

    render() {
        const apps = this.state.applications.map(app => {
            return (
                <Application
                    key={app.application_id}
                    application_id={app.application_id}
                    org_id={app.org_id}
                    user_id={app.user_id}
                    content={app.app_content}
                />
            );
        });

        const animalApps = this.state.applications.map(app => {
            return (
                <AnimalApplication
                    key={app.animal_id}
                    animal_id={app.animal_id}
                    org_id={app.org_id}
                    user_id={app.user_id}
                />
            );
        });

        return (
            <div>
                <Link to="/org/applications/create">
                    <button>Create Application</button>
                </Link>
                {!this.state.applications[0] && (
                    <h1>No Applications To Review</h1>
                )}
                {apps}
            </div>
        );
    }
}
