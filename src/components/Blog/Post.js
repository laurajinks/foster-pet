import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEdit: false,
            title: "",
            content: ""
        };
    }

    showEdit = () => {
        this.setState({ showEdit: true });
    };

    hideEdit = () => {
        this.setState({ showEdit: false });
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    submitEdit = () => {
        const { title, content } = this.state;
        const { post_id } = this.props;
        axios
            .put("/api/blog/org", { post_id, title, content })
            .then(() => {
                this.setState({ showEdit: false }, this.props.refresh());
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div className="blogPost">
                <div className="postAvatar">
                    <Link to={`/profile/org/${this.props.org_id}`}>
                        <img src={this.props.img} alt="avatar" />
                        <p>{this.props.username}</p>
                    </Link>
                </div>
                <p>{this.props.date}</p>
                <p>{this.props.time}</p>
                <h1>{this.props.title}</h1>
                <p>{this.props.content}</p>
                {this.props.allowEdit && (
                    <button onClick={this.showEdit}>Edit Post</button>
                )}
                {this.state.showEdit && (
                    <div className="editBlogPost">
                        <form onSubmit={this.submitEdit}>
                            <h3>Title:</h3>
                            <textarea
                                name="title"
                                type="text"
                                defaultValue={this.props.title}
                                onChange={this.handleInputChange}
                            />
                            <h3>Blog Post:</h3>
                            <textarea
                                className="blogField"
                                name="content"
                                defaultValue={this.props.content}
                                onChange={this.handleInputChange}
                            />
                            <br />
                            <button onClick={this.submitEdit}>
                                Submit Edit
                            </button>
                        </form>
                        <button onClick={this.hideEdit}>Cancel</button>
                    </div>
                )}
            </div>
        );
    }
}
