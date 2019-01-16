import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import "./header.css";

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
                    img: response.data.img,
                    isOrg: response.data.isOrg
                });
            })

            .catch(err => {
                console.log(err);
            });
    }
    logout = () => {
        axios
            .post(`/auth/logout`)
            .then(() => this.props.history.push("/"))
            .catch(err => console.log(err));
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.props.authReducer.id !== prevProps)
            axios
                .get(`/auth/getcurrentuser`)
                .then(response => {
                    this.setState({
                        username: response.data.username,
                        displayName: response.data.displayName,
                        id: response.data.id,
                        img: response.data.img,
                        isOrg: response.data.isOrg
                    });
                })

                .catch(err => {
                    console.log(err);
                });
    };

    render() {
        return (
            <div className="headerContainer">
                <h1>SiteLogo</h1>
                {this.state.isOrg === false && (
                    <>
                        <Link to="/user/newsfeed">
                            <p>Newsfeed</p>
                        </Link>
                        <Link to="/user/animals">
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
                {this.state.isOrg === true && (
                    <>
                        <Link to="/org/blog">
                            <p>Blog</p>
                        </Link>
                        <Link to="/org/applications">
                            <p>Applications</p>
                        </Link>
                        <Link to="/org/animals">
                            <p>Animals</p>
                        </Link>
                        <Link to="/org/currentfosters">
                            <p>Fosters</p>
                        </Link>
                    </>
                )}

                {this.state.id && (
                    <>
                        <button onClick={() => this.logout()}>Logout</button>
                        <Link to="/">
                            <img src={this.state.img} alt="avatar" width="50" />
                            <p>{this.state.username}</p>
                        </Link>
                    </>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(withRouter(Header));
