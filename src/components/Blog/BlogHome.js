import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Post from "./Post";

export default class BlogHome extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        };
    }

    componentDidMount = () => {
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
                    username={post.username}
                    img={post.img}
                    title={post.title}
                    content={post.content}
                />
            );
        });
        return (
            <div>
                <Header />
                <Link to="/org/blog/create">Create New Post</Link>
                {prevPosts}
            </div>
        );
    }
}
