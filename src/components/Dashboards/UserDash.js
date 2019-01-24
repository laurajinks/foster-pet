import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import NewsFeedPreview from "../Blog/NewsFeedPreview";
import AnimalSmall from "../FosterAnimals/AnimalSmall";

class UserDash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            id: "",
            currentAnimals: [],
            currentPosts: []
        };
        axios.get("/auth/getcurrentuser").then(response => {
            if (response.data.isOrg === true || !response.data) {
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
            .post("/api/animals/user")
            .then(response => this.setState({ currentAnimals: response.data }));
        axios
            .post("/api/blog/member")
            .then(response => this.setState({ currentPosts: response.data }))
            .catch(err => console.log(err));
    };

    render() {
        const animals = this.state.currentAnimals.map(animal => {
            return (
                <AnimalSmall
                    key={animal.animal_id}
                    img={animal.animal_img}
                    id={animal.animal_id}
                    org_id={animal.org_id}
                    org_display_name={animal.org_display_name}
                    user_id={animal.user_id}
                    name={animal.name}
                    age={animal.age}
                />
            );
        });
        const recentPosts = this.state.currentPosts.slice(0, 5);
        const posts = recentPosts.map(post => {
            return (
                <NewsFeedPreview
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
            <div className="dashboard">
                <div className="smallAnimalListContainer">
                    <h1 className="bold">Current Animals</h1>
                    {animals}
                </div>{" "}
                <div className="newsFeedPreview">
                    <h1 className="bold title">
                        Recent Posts From Your Groups:
                    </h1>
                    {!this.state.currentPosts[0] && <h2>No Posts To Show</h2>}
                    {posts}
                    <Link to="user/newsfeed">See More...</Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { username, id, isOrg } = state;
    return {
        username,
        id,
        isOrg
    };
};

export default connect(mapStateToProps)(withRouter(UserDash));
