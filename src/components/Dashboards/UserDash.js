import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import UserNewsFeed from "../Blog/UserNewsFeed";
import UserAnimals from "../FosterAnimals/UserAnimals";

class UserDash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            id: "",
            currentAnimals: []
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

    componentDidMount = () => {
        axios
            .post("/api/animals/user")
            .then(response => this.setState({ currentAnimals: response.data }));
    };

    render() {
        return (
            <div>
                <h1>Hello, {this.state.username}</h1>
                <div>
                    <h1>Current Animals</h1>
                    {animals}
                </div>
                <div>
                    <UserNewsFeed />
                </div>
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
