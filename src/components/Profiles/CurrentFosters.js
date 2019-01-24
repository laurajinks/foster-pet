import React, { Component } from "react";
import axios from "axios";
import Foster from "./Foster";

export default class CurrentFosters extends Component {
    constructor() {
        super();

        this.state = {
            currentFosters: [],
            refresh: false
        };

        axios.get("/auth/getcurrentuser").then(response => {
            if (response.data.isOrg === false || !response.data) {
                return this.props.history.push("/login");
            } else {
                this.setState({
                    username: response.data.username,
                    id: response.data.id
                });
            }
        });
    }

    loadData = () => {
        axios
            .post("/api/org/members")
            .then(response => this.setState({ currentFosters: response.data }))
            .catch(err => console.log(err));
    };

    componentDidMount = () => {
        this.loadData();
    };

    componentDidUpdate = () => {
        if (this.state.refresh === true) {
            this.loadData();
            this.setState({ refresh: false });
        }
    };

    removeFoster = user_id => {
        axios
            .delete(`/api/org/members/${user_id}`)
            .then(() => {
                this.setState({ refresh: true });
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
        return <div className="animalListContainer">{fosters}</div>;
    }
}
