import React, { Component } from "react";
import axios from "axios";
import Foster from "./Foster";

export default class CurrentFosters extends Component {
    constructor() {
        super();

        this.state = {
            currentFosters: []
        };
    }

    componentDidMount = () => {
        axios
            .post("/api/org/members")
            .then(response => this.setState({ currentFosters: response.data }))
            .catch(err => console.log(err));
    };

    removeFoster = user_id => {
        axios
            .delete(`/api/org/members/${user_id}`)
            .then(() => {
                axios
                    .post("/api/org/members")
                    .then(response =>
                        this.setState({ currentFosters: response.data })
                    )
                    .catch(err => console.log(err));
            })
            .catch(err => console.log(err));
    };

    render() {
        const fosters = this.state.currentFosters.map(person => {
            return (
                <Foster
                    key={person.user_id}
                    user_id={person.user_id}
                    email={person.email}
                    img={person.img}
                    displayName={person.user_display_name}
                    username={person.username}
                    removeFoster={this.removeFoster}
                />
            );
        });
        return <div>{fosters}</div>;
    }
}
