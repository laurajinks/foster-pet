import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Post from "./Post";

// Organization view of blog

export default class BlogHome extends Component {
    constructor() {
        super();

        this.state = {
            posts: [],
            allowEdit: true
        };
        axios.get("/auth/getcurrentuser").then(response => {
            if (response.data.isOrg === false || !response.data) {
                return this.props.history.push("/login");
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
                    date={post.date}
                    time={post.time}
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
            <div className="orgBlog">
                <div className="buttonContainer">
                    <Link to="/org/blog/create">
                        <button>Create New Post</button>
                    </Link>
                </div>
                {prevPosts}
            </div>
        );
    }
}
