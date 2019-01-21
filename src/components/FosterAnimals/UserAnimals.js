import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Animal from "./Animal";

export default class UserAnimals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            id: "",
            showEligible: false,
            currentAnimals: [],
            pendingAnimals: [],
            eligibleAnimals: []
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
            .get("/api/animals/user/pending")
            .then(response => this.setState({ pendingAnimals: response.data }));

        axios
            .get("/api/animals/user/eligible")
            .then(response =>
                this.setState({ eligibleAnimals: response.data })
            );
    };

    toggleFosterView = () => {
        this.setState({ showEligible: !this.state.showEligible });
    };

    applyToFosterAnimal = (animal_id, org_id) => {
        axios.post("/api/animal/application", { animal_id, org_id }).then(
            axios.post("/api/animals/user").then(
                response => this.setState({ currentAnimals: response.data }),
                axios.get("/api/animals/user/eligible").then(response =>
                    this.setState({
                        eligibleAnimals: response.data
                    })
                )
            )
        );
    };

    fosterAnimal = (animal_id, user_id) => {
        axios.put("/api/animals/fosterparent", { animal_id }).then(
            axios
                .post("/api/animal/application/delete", { animal_id, user_id })
                .then(
                    axios.post("/api/animals/user").then(
                        response =>
                            this.setState({ currentAnimals: response.data }),
                        axios.get("/api/animals/user/eligible").then(response =>
                            this.setState({
                                eligibleAnimals: response.data
                            })
                        )
                    )
                )
        );
    };

    render() {
        const current = this.state.currentAnimals.map(animal => {
            return (
                <Animal
                    key={animal.animal_id}
                    id={animal.animal_id}
                    org_id={animal.org_id}
                    org_display_name={animal.org_display_name}
                    user_id={animal.user_id}
                    name={animal.name}
                    age={animal.age}
                    animalType={animal.animal_type}
                    breed={animal.breed}
                    img={animal.animal_img}
                    sex={animal.sex}
                    size={animal.size}
                    description={animal.description}
                />
            );
        });

        const pending = this.state.pendingAnimals.map(animal => {
            return (
                <Animal
                    key={animal.animal_id}
                    id={animal.animal_id}
                    org_id={animal.org_id}
                    org_display_name={animal.org_display_name}
                    user_id={animal.user_id}
                    name={animal.name}
                    age={animal.age}
                    animalType={animal.animal_type}
                    breed={animal.breed}
                    img={animal.animal_img}
                    sex={animal.sex}
                    size={animal.size}
                    description={animal.description}
                    org_accept={animal.org_accept}
                    fosterAnimal={this.fosterAnimal}
                />
            );
        });

        const eligible = this.state.eligibleAnimals.map(animal => {
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
                    applyToFosterAnimal={this.applyToFosterAnimal}
                />
            );
        });

        return (
            <div className="animalListContainer">
                <h1 className="bold">Current Foster Animals</h1>
                {current}
                {pending}
                {!this.state.showEligible && (
                    <button onClick={this.toggleFosterView}>
                        Show Animals In Your Organizations
                    </button>
                )}
                {this.state.showEligible && (
                    <button onClick={this.toggleFosterView}>
                        Close Results
                    </button>
                )}
                {this.state.showEligible && eligible}
            </div>
        );
    }
}
