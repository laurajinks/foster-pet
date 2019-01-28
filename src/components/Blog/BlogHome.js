import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Post from "./Post";

// Organization view of blog

export default class BlogHome extends Component {
    constructor() {
        super();

        this.state = {
            refresh: false,
            posts: [],
            allowEdit: true
        };
    }

    loadData = () => {
        axios
            .post("/api/blog/org")
            .then(response =>
                this.setState({ posts: response.data, refresh: false })
            )
            .catch(err => console.log(err));
    };

    componentDidMount = () => {
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
        this.loadData();
    };

    componentDidUpdate = () => {
        if (this.state.refresh === true) {
            this.loadData();
        }
    };

    refresh = () => {
        this.setState({ refresh: true });
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
                    refresh={this.refresh}
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
