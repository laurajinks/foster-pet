import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Animal from "./Animal";
import Header from "../Header/Header";

class OrgAnimals extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            id: "",
            animalList: []
        };
        axios
            .get(`/auth/org`)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    id: response.data.id
                });
            })
            .catch(err => {
                console.log(err);
                this.props.history.push("/login");
            });
    }

    componentDidMount = () => {
        axios.get(`/api/animals/org`).then(response => {
            const results = response.data;
            this.setState({ animalList: results });
        });
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state !== prevState) {
            axios.get(`/api/animals/org`).then(response => {
                const results = response.data;
                this.setState({ animalList: results });
            });
        }
    };

    removeAnimal = id => {
        axios.delete(`/api/animals/${id}`);
    };

    removeFosterParent = id => {
        axios.put("/api/animals/org/fosterparent", { id });
    };

    render() {
        const animals = this.state.animalList.map(animal => {
            return (
                <Animal
                    key={animal.animal_id}
                    id={animal.animal_id}
                    org_id={animal.org_id}
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
                />
            );
        });
        return (
            <div>
                <Header />
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
