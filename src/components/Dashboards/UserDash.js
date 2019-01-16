import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class UserDash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            id: ""
        };

        axios
            .get(`/auth/user`)
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

export default connect(mapStateToProps)(UserDash);
