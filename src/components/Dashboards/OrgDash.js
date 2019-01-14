import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Header from "../Header/Header";
// const url = "http://localhost:3001";

class OrgDash extends Component {
    constructor() {
        super();

        this.state = {
            username: "",
            id: ""
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
                <Header />
                <h1>Hello, {this.state.username}</h1>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { username, id, isOrg } = state;
    return {
        username,
        id,
        isOrg
    };
};

export default connect(mapStateToProps)(OrgDash);
