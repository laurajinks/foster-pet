import React, { Component } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import { storage } from "../../firebase";

export default class EditOrgProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: "",
            email: "",
            bio: "",
            prevImg: "",
            newImg: "",
            image: null,
            url: ""
        };
    }

    componentDidMount = () => {
        this.setState({
            displayName: this.props.displayName,
            email: this.props.email,
            bio: this.props.bio,
            prevImg: this.props.img,
            url: this.props.img
        });
    };

    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    };

    handleFileChange = e => {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            this.setState({ image });
        }
    };

    handleUpload = event => {
        event.preventDefault();
        const { image } = this.state;
        const { username } = this.props;
        const uploadTask = storage.ref(`images/${username}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                //progress function
            },
            error => {
                //error function
                console.log(error);
            },
            () => {
                //complete function
                storage
                    .ref("images")
                    .child(username)
                    .getDownloadURL()
                    .then(url => this.setState({ url, newImg: url }));
            }
        );
    };

    render() {
        return (
            <div className="editProfile">
                <ImageUpload
                    handleFileChange={this.handleFileChange}
                    handleUpload={this.handleUpload}
                    prevImg={this.state.prevImg}
                    newImg={this.state.newImg}
                />
                <form
                    onSubmit={e =>
                        this.props.submitEdit(
                            e,
                            this.state.displayName,
                            this.state.email,
                            this.state.bio,
                            this.state.url
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
                                this.state.bio,
                                this.state.url
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
