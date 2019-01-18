import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import AppField from "./AppField";

class CreateApplication extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            id: "",
            input: "",
            application: []
        };

        axios.get(`/auth/org`).catch(err => {
            console.log(err);
            this.props.history.push("/login");
        });
    }

    handleInputChange = e => {
        this.setState({ input: e.target.value });
    };

    addField = e => {
        e.preventDefault();
        this.setState({
            application: [...this.state.application, this.state.input],
            input: ""
        });
    };

    removeField = field => {
        let newArr = [...this.state.application];
        let index = newArr.indexOf(field);
        newArr.splice(index, 1);
        this.setState({
            application: newArr
        });
    };

    submitApplication = () => {
        const app = this.state.application.join("/0");
        const { id } = this.state;
        axios
            .put(`/api/createapplication`, { id, app })
            .then(this.props.history.push("/org/applications"))
            .catch(err => console.log(err));
    };

    render() {
        const fields = this.state.application.map(field => {
            return <AppField field={field} removeField={this.removeField} />;
        });
        return (
            <div>
                {fields}
                <form onSubmit={this.addField}>
                    Add New Input Field{" "}
                    <input
                        type="text"
                        value={this.state.input}
                        onChange={this.handleInputChange}
                    />
                    <input type="submit" value="+" />
                </form>
                <button onClick={this.submitApplication}>
                    Submit Application
                </button>
            </div>
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(CreateApplication);
