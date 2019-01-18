import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import UserNewsFeed from "../Blog/UserNewsFeed";
import AnimalSmall from "../FosterAnimals/AnimalSmall";

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
        const animals = this.state.currentAnimals.map(animal => {
            return (
                <AnimalSmall
                    key={animal.animal_id}
                    id={animal.animal_id}
                    org_id={animal.org_id}
                    org_display_name={animal.org_display_name}
                    user_id={animal.user_id}
                    name={animal.name}
                    age={animal.age}
                />
            );
        });
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

export default connect(mapStateToProps)(withRouter(UserDash));
