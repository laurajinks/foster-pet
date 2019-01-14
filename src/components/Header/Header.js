import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./header.css";

class Header extends Component {
    render() {
        console.log(this.props);
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
                        <Link to="/applications">
                            <p>Applications</p>
                        </Link>
                        <Link to="/animals">
                            <p>Animals</p>
                        </Link>
                        <Link to="/fosters">
                            <p>Fosters</p>
                        </Link>
                    </>
                )}

                <h1>{this.props.authReducer.username}</h1>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Header);
