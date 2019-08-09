import React from "react";
import axios from "./axios";

export default class BioEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    handleChange(e) {
        console.log(e.target.value);
        this.setState({
            newBio: e.target.value
        });
    }
    submit(e) {
        e.preventDefault();

        axios
            .post("/bio", { bio: this.state.newBio })
            .then(({ data }) => {
                console.log("data:", data);

                this.setState({
                    editing: false
                });
                this.props.setBio(data.bio);
            })
            .catch(err => {
                console.log(err);
            });
    }
    render() {
        return (
            <div>
                {this.state.editing && (
                    <div>
                        <textarea
                            className="bioTextarea"
                            name="draftBio"
                            defaultValue={this.props.bio}
                            onChange={e => this.handleChange(e)}
                        />
                        <button onClick={e => this.submit(e)}>save</button>
                    </div>
                )}
                {!this.props.bio && <p>Add your bio.</p>}
                {this.props.bio}

                <button onClick={() => this.setState({ editing: true })}>
                    Edit your bio
                </button>
            </div>
        );
    }
}
