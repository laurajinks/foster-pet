import React, { Component } from "react";
import { Link } from "react-router-dom";
import './headers.css'

export default class UserHeader extends Component {
    render() {
        return (
            <div className="headerContainer">
                <h1>SiteLogo</h1>
                <Link to="/newsfeed">
                    <p>Newsfeed</p>
                </Link>
                <Link to="/fosteranimals">
                    <p>Foster Animals</p>
                </Link>
                <Link to="/organizations">
                    <p>Find a Foster Group</p>
                </Link>
                <Link to="/adopt">
                    <p>Adopt</p>
                </Link>
            </div>
        );
    }
}
