import React, { Component } from "react";
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
            eligibleAnimals: []
        };

        axios
            .get(`/auth/user`)
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
        axios
            .post("/api/animals/user")
            .then(response => this.setState({ currentAnimals: response.data }));

        axios
            .get("/api/animals/user/eligible")
            .then(response =>
                this.setState({ eligibleAnimals: response.data })
            );
    };

    toggleFosterView = () => {
        this.setState({ showEligible: !this.state.showEligible });
    };

    fosterAnimal = animal_id => {
        axios.put("/api/animals/fosterparent", { animal_id }).then(
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
                    fosterAnimal={this.fosterAnimal}
                />
            );
        });

        return (
            <div>
                <h1>Current Foster Animals</h1>
                {current}
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
