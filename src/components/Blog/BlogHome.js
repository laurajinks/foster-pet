import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Post from "./Post";

export default class BlogHome extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            allowEdit: true
        };
    }

    componentDidMount = () => {
        axios
            .post("/api/blog/org")
            .then(response => this.setState({ posts: response.data }))
            .catch(err => console.log(err));
    };

    reRender = () => {
        axios
            .post("/api/blog/org")
            .then(response => this.setState({ posts: response.data }))
            .catch(err => console.log(err));
    };

    render() {
        const prevPosts = this.state.posts.map(post => {
            return (
                <Post
                    key={post.post_id}
                    post_id={post.post_id}
                    username={post.username}
                    img={post.img}
                    title={post.title}
                    content={post.content}
                    allowEdit={this.state.allowEdit}
                    reRender={this.reRender}
                />
            );
        });
        return (
            <div>
                <Link to="/org/blog/create">Create New Post</Link>
                {prevPosts}
            </div>
        );
    }
}
