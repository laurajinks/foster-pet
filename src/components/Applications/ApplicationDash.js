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
            animalApplications: [],
            refresh: false
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

        axios
            .get("/api/animal/applications")
            .then(response => {
                this.setState({
                    animalApplications: response.data
                });
            })
            .catch(err => console.log(err));
    };

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.state.refresh) {
            await axios
                .post("/api/applications/org")
                .then(response => {
                    this.setState({ applications: response.data });
                })
                .catch(err => console.log(err));

            axios
                .get("/api/animal/applications")
                .then(response => {
                    this.setState({
                        animalApplications: response.data,
                        refresh: false
                    });
                })
                .catch(err => console.log(err));
        }
    };

    acceptApp = async (org_id, user_id, id) => {
        await axios.post("/api/members", { org_id, user_id });
        axios
            .delete(`/api/applications/${id}`)
            .then(() => this.setState({ refresh: true }));
    };

    denyApp = async id => {
        await axios
            .delete(`/api/applications/${id}`)
            .then(() => this.setState({ refresh: true }));
    };

    acceptAnimalApp = (animal_id, user_id) => {
        axios
            .put("/api/animal/application", { animal_id, user_id })
            .then(() => this.setState({ refresh: true }));
    };

    denyAnimalApp = (animal_id, user_id) => {
        axios
            .delete(`/api/animal/application/${animal_id}`, { user_id })
            .then(() => this.setState({ refresh: true }));
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

        const animalApps = this.state.animalApplications.map(app => {
            return (
                <AnimalApplication
                    key={app.animal_id}
                    animal_id={app.animal_id}
                    img={app.img}
                    animal_img={app.animal_img}
                    org_id={app.org_id}
                    user_id={app.user_id}
                    username={app.username}
                    name={app.name}
                    org_accept={app.org_accept}
                    acceptAnimalApp={this.acceptAnimalApp}
                    denyAnimalApp={this.denyAnimalApp}
                />
            );
        });

        return (
            <div>
                <Link to="/org/applications/create">
                    <button>Create Application</button>
                </Link>
                {!this.state.applications[0] &&
                    !this.state.animalApplications[0] && (
                        <h1>No Applications To Review</h1>
                    )}
                {animalApps}
                {apps}
            </div>
        );
    }
}
