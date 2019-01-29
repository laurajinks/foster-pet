import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OrgApp from "./OrgApp";
export default class Organization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refresh: false,
            showApp: false,
            pendingApp: false,
            isMember: false
        };
    }

    loadData = () => {
        const { user_id, org_id } = this.props;
        axios
            .post("/api/appstatus", { user_id, org_id })
            .then(response => {
                if (response.data[0]) {
                    this.setState({ pendingApp: true });
                }
            })
            .catch(err => console.log(err));

        axios
            .post("/api/memberstatus", { user_id, org_id })
            .then(response => {
                if (response.data[0]) {
                    this.setState({ isMember: true });
                }
            })
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

    showApp = () => {
        this.setState({ showApp: true });
    };

    hideApp = () => {
        this.setState({ showApp: false });
    };

    reRender = () => {
        this.setState({ refresh: true });
    };

    render() {
        return (
            <div className="organization">
                <Link to={`profile/org/${this.props.org_id}`}>
                    <img
                        className="resultThumb"
                        src={this.props.img}
                        alt={this.props.org_username}
                    />
                    <h1 className="title">{this.props.displayName}</h1>
                    <p className="resultName">{this.props.org_username}</p>
                </Link>

                <p>Zip Code:{this.props.zipcode}</p>
                <p>Email: {this.props.email}</p>
                {!this.state.pendingApp && !this.state.isMember && (
                    <button className="applyBtn" onClick={() => this.showApp()}>
                        Apply
                    </button>
                )}
                {this.state.pendingApp && (
                    <p className="status">Status: Pending</p>
                )}
                {this.state.isMember && (
                    <p className="status">Status: Member</p>
                )}

                {this.state.showApp && (
                    <OrgApp
                        user_id={this.props.user_id}
                        org_id={this.props.org_id}
                        application={this.props.application}
                        hideApp={this.hideApp}
                        reRender={this.reRender}
                    />
                )}
            </div>
        );
    }
}
