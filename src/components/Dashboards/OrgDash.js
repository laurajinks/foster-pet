import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

class OrgDash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            id: "",
            animalList: [],
            appCount: 0
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

    componentDidMount = () => {
        axios.get(`/api/animals/org`).then(response => {
            const results = response.data;
            this.setState({ animalList: results });
        });

        axios.get("/api/applications/org/count").then(response => {
            console.log(response.data);
            const results = response.data[0].count;
            this.setState({ appCount: this.state.appCount + +results });
        });

        axios.get("/api/applications/org/animalcount").then(response => {
            const results = response.data[0].count;
            this.setState({ appCount: this.state.appCount + +results });
        });
    };

    render() {
        return (
            <div>
                <div>
                    {this.state.appCount > 0 && (
                        <div>
                            <h1>Applications Needing Review:</h1>{" "}
                            <Link to="/org/applications">
                                {this.state.appCount}
                            </Link>
                        </div>
                    )}
                    {this.state.appCount === 0 && (
                        <h1>No Applications To Review</h1>
                    )}
                </div>
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
