import React, { Component } from "react";

export default class AnimalApplication extends Component {
    render() {
        return (
            <div>
                <p>Application</p>
                <img
                    src={this.props.animal_img}
                    alt="animal profile"
                    width="100"
                />
                <h1>{this.props.name}</h1>
                <img src={this.props.img} alt="foster avatar" width="100" />
                <h2>{this.props.username}</h2>
                {!this.props.org_accept && (
                    <div>
                        <button
                            onClick={() =>
                                this.props.acceptAnimalApp(
                                    this.props.animal_id,
                                    this.props.user_id
                                )
                            }
                        >
                            Accept
                        </button>
                        <button
                            onClick={() =>
                                this.props.denyAnimalApp(
                                    this.props.animal_id,
                                    this.props.user_id
                                )
                            }
                        >
                            Deny
                        </button>
                    </div>
                )}
                {this.props.org_accept && (
                    <div>
                        <h1>Pending Foster Acceptance</h1>
                    </div>
                )}
            </div>
        );
    }
}
