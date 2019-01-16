import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";

export default class UserNewsFeed extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        };
    }

    componentDidMount = () => {
        axios
            .post("/api/blog/member")
            .then(response => this.setState({ posts: response.data }))
            .catch(err => console.log(err));
    };

    render() {
        const prevPosts = this.state.posts.map(post => {
            return (
                <Post
                    key={post.post_id}
                    date={post.date}
                    time={post.time}
                    username={post.username}
                    img={post.img}
                    title={post.title}
                    content={post.content}
                />
            );
        });
        return <div>{prevPosts}</div>;
    }
}
