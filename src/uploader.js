import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        console.log(e.target.files[0]);
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }
    handleUploadClick(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        axios
            .post("/uploader", formData)
            .then(({ data }) => {
                if (data.image) {
                    this.props.done(data.image);
                    this.props.onClick();
                }
            })
            .catch(err => {
                console.log("Error Message: ", err);
            });
    }
    render() {
        return (
            <div className="uploaderModal">
                <div className="innerModal">
                    <div className="closebtn" onClick={this.props.onClick}>
                        Close
                    </div>
                    <p>Want to change your profile image?</p>

                    <label>
                        Upload file
                        <input
                            type="file"
                            name="file"
                            onChange={e => this.handleChange(e)}
                        />
                    </label>
                    <button
                        type="submit"
                        onClick={e => this.handleUploadClick(e)}
                    >
                        Upload
                    </button>
                </div>
            </div>
        );
    }
}
