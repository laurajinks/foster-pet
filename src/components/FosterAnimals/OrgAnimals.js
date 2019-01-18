import React, { Component } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Animal from "./Animal";

class OrgAnimals extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            id: "",
            animalList: []
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

    removeAnimal = id => {
        axios.delete(`/api/animals/${id}`).then(
            axios.get(`/api/animals/org`).then(response => {
                const results = response.data;
                this.setState({ animalList: results });
            })
        );
    };

    removeFosterParent = id => {
        axios.put("/api/animals/org/fosterparent", { id }).then(
            axios.get(`/api/animals/org`).then(response => {
                const results = response.data;
                this.setState({ animalList: results });
            })
        );
    };

    submitEdit = () => {};

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
                    submitEdit={this.submitEdit}
                />
            );
        });
        return (
            <div>
                <Link to="/org/animals/create">
                    <button>Create New Animal Listing</button>
                </Link>
                {animals}
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(OrgAnimals);
