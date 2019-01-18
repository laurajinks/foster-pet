import React, { Component } from "react";
import axios from "axios";

export default class CreatePost extends Component {
    constructor() {
        super();

        this.state = {
            title: "",
            content: ""
        };
        axios.get(`/auth/org`).catch(err => {
            console.log(err);
            this.props.history.push("/login");
        });
    }

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitPost = event => {
        event.preventDefault();
        const newDate = new Date();
        const currentDate = newDate.toDateString();
        const currentTime = newDate.toLocaleTimeString();
        const { title, content } = this.state;
        console.log(currentDate);
        axios
            .post("/api/blog", { title, content, currentDate, currentTime })
            .then(() => {
                this.props.history.push("/org/blog");
            })
            .catch(err => alert(err));
    };

    render() {
        return (
            <div>
                <form onSubmit={this.submitPost}>
                    <div className="blogTitle">
                        Post Title:
                        <textarea
                            className="blogTitleInput"
                            name="title"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <div className="blogField">
                        Write Post:
                        <textarea
                            className="blogContentInput"
                            name="content"
                            onChange={this.handleInputChange}
                        />
                    </div>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }
}
