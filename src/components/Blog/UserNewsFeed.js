import React, { Component } from "react";
import axios from "axios";
import Post from "./Post";

export default class UserNewsFeed extends Component {
    constructor() {
        super();

        this.state = {
            posts: []
        };
        axios.get("/auth/getcurrentuser").then(response => {
            if (response.data.isOrg === true || !response.data) {
                return this.props.history.push("/");
            } else {
                this.setState({
                    username: response.data.username,
                    id: response.data.id
                });
            }
        });
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
                    org_id={post.org_id}
                    date={post.date}
                    time={post.time}
                    username={post.username}
                    img={post.img}
                    title={post.title}
                    content={post.content}
                />
            );
        });
        return (
            <div className="userNewsFeed">
                <h1 className="title">Recent Posts From Your Groups</h1>
                {prevPosts}
            </div>
        );
    }
}
