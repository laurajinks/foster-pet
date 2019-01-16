import React, { Component } from "react";
import axios from "axios";

export default class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            img: "",
            displayName: "",
            user_id: "",
            username: ""
        };
    }

    componentDidMount = () => {
        const { id } = this.props.match.params;
        axios.post("/api/user", { id }).then(response => {
            console.log(response.data);
            const {
                email,
                img,
                user_display_name,
                user_id,
                username
            } = response.data[0];
            this.setState({
                email,
                img,
                displayName: user_display_name,
                user_id,
                username
            });
        });
    };
    render() {
        return (
            <div>
                <img src={this.state.img} alt="avatar" width="100" />
                <h1>{this.state.displayName}</h1>
                <h3>{this.state.username}</h3>
                <h2>Email: {this.state.email}</h2>
                {/* <h2> Current Organizations:</h2> */}
                {/* <h2>Current Animals:</h2> */}
            </div>
        );
    }
}
