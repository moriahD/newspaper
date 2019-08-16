import React from "react";
import axios from "./axios";

export default class UploadImage extends React.Component {
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
    changeImage(image) {
        this.setState({
            [image]: image
        });
    }
    async handleUploadClick(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        try {
            const { data } = await axios.post("/admin/uploader.json", formData);
            console.log("data: ", data.image);
            this.changeImage(data.image);
            this.props.handler(data.image);
        } catch (err) {
            console.log(`error in /admin/uploader.json`, err);
        }
        // axios
        //     .post("/admin/uploader.json", formData)
        //     .then(({ data }) => {
        //         if (data.image) {
        //             this.props.done(data.image);
        //             this.props.onClick();
        //             console.log(data.image);
        //         }
        //     })
        //     .catch(err => {
        //         console.log("Error Message: ", err);
        //     });
    }
    render() {
        return (
            <div className="uploaderModal">
                <div className="innerModal">
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
                    <img src={this.state.image} />
                </div>
            </div>
        );
    }
}
