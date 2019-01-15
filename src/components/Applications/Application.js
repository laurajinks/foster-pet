import React, { Component } from "react";
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

    render() {
        const array = this.props.content.split("/0");
        const answers = array.map(item => {
            return <p>{item}</p>;
        });
        return (
            <div>
                <img src={this.state.img} alt="avatar" width="100" />
                <h1>{this.state.username}</h1>
                <h2>{this.state.email}</h2>
                {answers}
                <button>Accept</button>
                <button>Deny</button>
            </div>
        );
    }
}
