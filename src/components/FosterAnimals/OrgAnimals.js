import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Animal from "./Animal";

class OrgAnimals extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            id: "",
            animalList: [],
            allowEdit: true,
            refresh: false
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
    };

    componentDidUpdate = () => {
        if (this.state.refresh === true) {
            axios.get(`/api/animals/org`).then(response => {
                const results = response.data;
                this.setState({ animalList: results, refresh: false });
            });
        }
    };

    removeAnimal = id => {
        axios.delete(`/api/animals/${id}`).then(
            axios.get(`/api/animals/org`).then(response => {
                const results = response.data;
                this.setState({ animalList: results });
            })
        );
    };

    toggleRefresh = () => {
        this.setState({ refresh: !this.state.refresh });
    };

    removeFosterParent = id => {
        axios.put("/api/animals/org/fosterparent", { id }).then(
            axios.get(`/api/animals/org`).then(response => {
                const results = response.data;
                this.setState({ animalList: results });
            })
        );
    };

    render() {
        const animals = this.state.animalList.map(animal => {
            return (
                <Animal
                    key={animal.animal_id}
                    id={animal.animal_id}
                    org_id={animal.org_id}
                    org_display_name={animal.org_display_name}
                    user_username={animal.username}
                    user_id={animal.user_id}
                    name={animal.name}
                    age={animal.age}
                    animalType={animal.animal_type}
                    breed={animal.breed}
                    img={animal.animal_img}
                    sex={animal.sex}
                    size={animal.size}
                    description={animal.description}
                    removeAnimal={this.removeAnimal}
                    removeFosterParent={this.removeFosterParent}
                    allowEdit={this.state.allowEdit}
                    toggleRefresh={this.toggleRefresh}
                />
            );
        });
        return (
            <div>
                <div className="buttonContainer">
                    <Link to="/org/animals/create">
                        <button>Create New Animal Listing</button>
                        <br />
                    </Link>
                </div>
                <div className="animalListContainer">
                    <h1 className="title">Current Animals</h1>
                    {animals}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(OrgAnimals);
