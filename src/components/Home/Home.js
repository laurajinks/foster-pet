import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="homepage">
            {/* <div className="homepageImg">
                <img
                    src="https://firebasestorage.googleapis.com/v0/b/animal-foster-project.appspot.com/o/images%2Fadorable-animal-canine-1346086.jpg?alt=media&token=65a31dbb-f506-4d0e-951d-9426c62c40ba"
                    alt="background"
                />
            </div> */}
            <div className="loginSignUpContainer">
                <div className="homeMain">
                    <h1>Page Title</h1>
                    <h3>Page subheader</h3>
                    <div className="loginSignUpBtns">
                        <Link to="/login">
                            <button>Log In</button>
                        </Link>
                        <Link to="/signup">
                            <button>Sign Up</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
