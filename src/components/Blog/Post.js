import React, { Component } from "react";
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
                this.setState({ showEdit: false }, this.props.reRender());
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <img src={this.props.img} alt="avatar" />
                <p>{this.props.username}</p>
                <p>{this.props.date}</p>
                <p>{this.props.time}</p>
                <h1>{this.props.title}</h1>
                <p>{this.props.content}</p>
                {this.props.allowEdit && (
                    <button onClick={this.showEdit}>Edit Post</button>
                )}
                {this.state.showEdit && (
                    <div>
                        <form onSubmit={this.submitEdit}>
                            Title:
                            <textarea
                                name="title"
                                type="text"
                                defaultValue={this.props.title}
                                onChange={this.handleInputChange}
                            />
                            Blog Post:
                            <textarea
                                name="content"
                                defaultValue={this.props.content}
                                onChange={this.handleInputChange}
                            />
                            <input type="submit" value="Submit" />
                        </form>
                        <button onClick={this.hideEdit}>Cancel</button>
                    </div>
                )}
            </div>
        );
    }
}
