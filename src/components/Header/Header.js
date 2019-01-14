import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./header.css";
// const url = "http://localhost:3001";

class Header extends Component {
    constructor() {
        super();
    }
    logout = () => {
        axios
            .post(`/auth/logout`)
            .then(() => this.props.history.push("/"))
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="headerContainer">
                <h1>SiteLogo</h1>
                {!this.props.authReducer.isOrg && (
                    <>
                        <Link to="/dashboard/user">
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
                    </>
                )}
                {this.props.authReducer.isOrg && (
                    <>
                        <Link to="/blog">
                            <p>Blog</p>
                        </Link>
                        <Link to="/org/applications">
                            <p>Applications</p>
                        </Link>
                        <Link to="/org/animals">
                            <p>Animals</p>
                        </Link>
                        <Link to="/org/fosters">
                            <p>Fosters</p>
                        </Link>
                    </>
                )}

                <button onClick={() => this.logout()}>
                    Logout {this.props.authReducer.username}
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Header);
