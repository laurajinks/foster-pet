import React, { Component } from "react";
import axios from "axios";

export default class EditOrgProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return <div />;
    }
}
