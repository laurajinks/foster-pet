import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Application extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            displayName: "",
            email: "",
            img: ""
        };
    }

    componentDidMount = () => {
        const id = this.props.user_id;
        axios
            .post("/api/user", { id })
            .then(response => {
                const {
                    username,
                    user_display_name,
                    email,
                    img
                } = response.data[0];
                this.setState({
                    username,
                    displayName: user_display_name,
                    email,
                    img
                });
            })
            .catch(err => console.log(err));
    };

    acceptApplication = () => {
        const { application_id, user_id, org_id } = this.props;
        axios
            .post("/api/members", { user_id, org_id })
            .then(
                axios
                    .delete(`/api/applications/${application_id}`)
                    .catch(err => console.log(err))
            )
            .catch(err => console.log(err));
    };

    denyApplication = () => {
        const id = this.props.application_id;
        axios.delete(`/api/applications/${id}`);
    };

    render() {
        const array = this.props.content.split("/0");
        const answers = array.map(item => {
            return <p>{item}</p>;
        });
        return (
            <div>
                <img src={this.state.img} alt="avatar" width="100" />
                <Link to={`/profile/user/${this.props.user_id}`}>
                    <h1>{this.state.username}</h1>
                </Link>
                <h2>{this.state.email}</h2>
                {answers}
                <button onClick={this.acceptApplication}>Accept</button>
                <button onClick={this.denyApplication}>Deny</button>
            </div>
        );
    }
}
