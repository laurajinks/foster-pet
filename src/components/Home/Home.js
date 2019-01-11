import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="homepage">
            <img className="homepageBackground" />
            <h1>Page Title</h1>
            <h3>Page subheader</h3>
            <Link to="/login">
                <button>Log In</button>
            </Link>
            <Link to="/signup">
                <button>Sign Up</button>
            </Link>
        </div>
    );
};

export default Home;
