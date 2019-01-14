import React, { Component } from "react";
import axios from "axios";
import AppField from "./AppField";

export default class CreateApplication extends Component {
    constructor() {
        super();
        this.state = {
            input: "",
            application: []
        };
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
        //TODO
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
