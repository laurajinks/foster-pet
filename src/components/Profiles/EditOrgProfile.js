import React, { Component } from "react";

export default class EditOrgProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: "",
            email: "",
            bio: ""
        };
    }

    componentDidMount = () => {
        this.setState({
            displayName: this.props.displayName,
            email: this.props.email,
            bio: this.props.bio
        });
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    render() {
        return (
            <div className="editProfile">
                <form
                    onSubmit={e =>
                        this.props.submitEdit(
                            e,
                            this.state.displayName,
                            this.state.email,
                            this.state.bio
                        )
                    }
                >
                    Display Name:
                    <input
                        type="text"
                        name="displayName"
                        defaultValue={this.props.displayName}
                        onChange={this.handleInputChange}
                    />
                    Email:
                    <input
                        type="text"
                        name="email"
                        defaultValue={this.props.email}
                        onChange={this.handleInputChange}
                    />
                    Bio:
                    <textarea
                        className="bioEdit"
                        type="text"
                        name="bio"
                        defaultValue={this.props.bio}
                        onChange={this.handleInputChange}
                    />
                    <button
                        onClick={e =>
                            this.props.submitEdit(
                                e,
                                this.state.displayName,
                                this.state.email,
                                this.state.bio
                            )
                        }
                    >
                        Submit Edits
                    </button>
                </form>
                <button onClick={this.props.toggleEdit}>Cancel</button>
            </div>
        );
    }
}
