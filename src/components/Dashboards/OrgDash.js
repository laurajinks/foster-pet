import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";
import AnimalSmall from "../FosterAnimals/AnimalSmall";

class OrgDash extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            id: "",
            animalList: [],
            appCount: 0
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
        axios.get(`/api/animals/org`).then(response => {
            const results = response.data;
            this.setState({ animalList: results });
        });

        axios.get("/api/applications/org/count").then(response => {
            const results = response.data[0].count;
            this.setState({ appCount: this.state.appCount + +results });
        });

        axios.get("/api/applications/org/animalcount").then(response => {
            const results = response.data[0].count;
            this.setState({ appCount: this.state.appCount + +results });
        });
    };

    render() {
        const animals = this.state.animalList.map(animal => {
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
        return (
            <div className="dashboard">
                <div className="animalListContainer">
                    <div className="appPreview">
                        {this.state.appCount > 0 && (
                            <div>
                                <div className="appCount">
                                    <h1>Applications Needing Review:</h1>
                                    <Link to="/org/applications">
                                        {this.state.appCount}
                                    </Link>
                                </div>
                            </div>
                        )}
                        {this.state.appCount === 0 && (
                            <h1>No Applications To Review</h1>
                        )}
                    </div>
                    {!this.state.animalList && <h1>No Current Animals</h1>}
                    {animals}
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

export default connect(mapStateToProps)(OrgDash);
