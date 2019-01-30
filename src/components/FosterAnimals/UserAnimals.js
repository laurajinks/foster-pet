import React, { Component } from "react";
import axios from "axios";
import Animal from "./Animal";

export default class UserAnimals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            refresh: false,
            username: "",
            id: "",
            showEligible: false,
            currentAnimals: [],
            pendingAnimals: [],
            eligibleAnimals: []
        };
    }

    loadData = () => {
        //get current animals
        axios
            .post("/api/animals/user")
            .then(response => this.setState({ currentAnimals: response.data }));

        axios
            //get animals pending foster approval
            .get("/api/animals/user/pending")
            .then(response => this.setState({ pendingAnimals: response.data }));
        //get eligible animals from organizations user is a member of
        axios
            .get("/api/animals/user/eligible")
            .then(response =>
                this.setState({ eligibleAnimals: response.data })
            );
    };

    componentDidMount = () => {
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
        this.loadData();
    };

    componentDidUpdate = () => {
        if (this.state.refresh === true) {
            this.loadData();
            this.setState({ refresh: false });
        }
    };

    toggleFosterView = () => {
        this.setState({ showEligible: !this.state.showEligible });
    };

    //submit Application for Organization to approve
    applyToFosterAnimal = (animal_id, org_id) => {
        axios
            .post("/api/animal/application", { animal_id, org_id })
            .then(() => this.setState({ refresh: true }));
    };

    //Accept foster animal after Organization has submitted approval
    fosterAnimal = animal_id => {
        console.log("hi");
        axios
            .put("/api/animals/fosterparent", { animal_id })
            .then(() => this.setState({ refresh: true }));
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
                    applyToFosterAnimal={this.applyToFosterAnimal}
                />
            );
        });

        return (
            <div>
                <div className="animalListContainer">
                    <h1 className="bold title">Current Foster Animals</h1>
                    {current}
                    {pending}
                </div>
                {!this.state.showEligible && (
                    <div className="buttonContainer">
                        <button onClick={this.toggleFosterView}>
                            Show Animals In Your Organizations
                        </button>
                    </div>
                )}
                {this.state.showEligible && (
                    <div className="buttonContainer">
                        <button onClick={this.toggleFosterView}>
                            Close Results
                        </button>
                    </div>
                )}
                {this.state.showEligible && (
                    <div className="animalListContainer">{eligible}</div>
                )}
            </div>
        );
    }
}
