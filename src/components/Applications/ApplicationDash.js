import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class ApplicationDash extends Component {
    constructor() {
        super();

        this.state = {
            applications: []
        };
    }

    render() {
        return (
            <div>
                <Link to="/applications/create">
                    <button>Create Application</button>
                </Link>
            </div>
        );
    }
}
