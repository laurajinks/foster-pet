import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./header.css";
// const url = "http://localhost:3001";

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            displayName: "",
            id: "",
            img: ""
        };

        axios
            .get(`/auth/getcurrentuser`)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    displayName: response.data.displayName,
                    id: response.data.id,
                    img: response.data.img
                });
            })

            .catch(err => {
                console.log(err);
            });
    }
    logout = () => {
        axios.post(`/auth/logout`).catch(err => console.log(err));
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

                <Link to="/">
                    <button onClick={() => this.logout()}>Logout</button>
                    <img src={this.state.img} alt="avatar" width="50" />
                    <p>{this.state.username}</p>
                </Link>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Header);
