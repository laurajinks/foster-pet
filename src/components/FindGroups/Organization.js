import React, { Component } from "react";
import axios from "axios";
import OrgApp from "./OrgApp";
export default class Organization extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showApp: false,
            pendingApp: false,
            isMember: false
        };
    }

    componentDidMount = () => {
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

    showApp = () => {
        this.setState({ showApp: true });
    };

    hideApp = () => {
        this.setState({ showApp: false });
    };

    render() {
        return (
            <div className="resultBox">
                <div className="result">
                    <img
                        className="resultThumb"
                        src={this.props.img}
                        alt={this.props.org_username}
                    />
                    <p>{this.props.displayName}</p>
                    <p className="resultName">{this.props.org_username}</p>
                    <p>Zip Code:{this.props.zipcode}</p>
                    <p>Email: {this.props.email}</p>
                    {!this.state.pendingApp && !this.state.isMember && (
                        <button
                            className="applyBtn"
                            onClick={() => this.showApp()}
                        >
                            Apply
                        </button>
                    )}
                    {this.state.pendingApp && <p>Status: Pending</p>}
                    {this.state.isMember && <p>Status: Member</p>}
                </div>
                {this.state.showApp && (
                    <OrgApp
                        user_id={this.props.user_id}
                        org_id={this.props.org_id}
                        application={this.props.application}
                        hideApp={this.hideApp}
                    />
                )}
            </div>
        );
    }
}
