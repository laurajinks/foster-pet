import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Animal from "./Animal";

class OrgAnimals extends Component {
    constructor() {
        super();
        this.state = {
            refresh: false,
            username: "",
            id: "",
            animalList: [],
            allowEdit: true
        };
    }

    loadData = () => {
        axios.get(`/api/animals/org`).then(response => {
            const results = response.data;
            this.setState({ animalList: results, refresh: false });
        });
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

    removeAnimal = id => {
        axios
            .delete(`/api/animals/${id}`)
            .then(this.setState({ refresh: true }));
    };

    toggleRefresh = () => {
        this.setState({ refresh: !this.state.refresh });
    };

    removeFosterParent = id => {
        axios.put("/api/animals/org/fosterparent", { id }).then(() => {
            this.setState({ refresh: true });
        });
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
                <div className="animalListContainer">
                    <div className="buttonContainer">
                        <Link to="/org/animals/create">
                            <button>Create New Animal Listing</button>
                            <br />
                        </Link>
                    </div>
                    <h1 className="title">Current Animals</h1>
                    {animals}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(OrgAnimals);
