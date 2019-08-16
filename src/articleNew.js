import React from "react";

import axios from "./axios";
import UploadImage from "./uploadImage";

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        const { id } = this.props.match.params;

        const aritlce = await axios.get(`/admin/article/new.json`);
        console.log(aritlce.data);
        this.setState(aritlce.data);
    }
    insertTitle(e) {
        this.setState({
            title: e.target.value
        });
    }
    changeDesc(e) {
        this.setState({
            description: e.target.value
        });
    }
    changeArticleBody(e) {
        this.setState({
            article_body: e.target.value
        });
    }
    changeCategory(e) {
        this.setState({
            category: e.target.value
        });
        console.log("category target:", e.target.value);
    }
    handleImageUploadChange(e) {
        console.log(e.target.files[0]);
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }
    changeImage(props) {
        // this.setState({
        //     image: props.image
        // });
    }
    async handleUploadClick(e) {
        e.preventDefault();
        var formData = new FormData();
        formData.append("file", this.state.file);
        try {
            const { data } = await axios.post("/admin/uploader.json", formData);
            console.log("data: ", data.image);
            // this.changeImage(data.image);
            this.setState({
                image: data.image
            });
            console.log("this state: ", this.state.image);
        } catch (err) {
            console.log(`error in /admin/uploader.json`, err);
        }
    }
    async submit(e) {
        e.preventDefault();
        console.log("state", this.state);
        try {
            const { data } = await axios.post(`/admin/article/new.json`, {
                editTitle: this.state.title,
                editDescription: this.state.description,
                editArticleBody: this.state.article_body,
                editImage: this.state.image,
                category: this.state.category
            });
            console.log("data", data);
            location.replace(`/admin/articles/${data.id}`);
        } catch (err) {
            console.log(`error in /admin/article/new.json`, err);
        }
    }

    render() {
        return (
            <div className="articleFormWrapNew">
                <form>
                    <label htmlFor="category">Select Category:</label>
                    <select
                        name="category"
                        onChange={e => this.changeCategory(e)}
                    >
                        <option value="1">Business</option>
                        <option value="2">Life</option>
                        <option value="3">World</option>
                        <option value="4">Tech</option>
                    </select>
                    <div className="uploaderModal">
                        <div className="innerModal">
                            <label>
                                Upload file
                                <input
                                    type="file"
                                    name="file"
                                    onChange={e =>
                                        this.handleImageUploadChange(e)
                                    }
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
                    <label htmlFor="title">Title:</label>
                    <textarea
                        name="title"
                        placeholder="title"
                        value={this.state.title}
                        onChange={e => this.insertTitle(e)}
                    >
                        {this.state.title}
                    </textarea>
                    <label htmlFor="description">Description:</label>

                    <textarea
                        name="description"
                        value={this.state.description}
                        onChange={e => this.changeDesc(e)}
                    >
                        {this.state.description}
                    </textarea>

                    <label htmlFor="article_body">Article Body:</label>

                    <textarea
                        name="article_body"
                        value={this.state.article_body}
                        onChange={e => this.changeArticleBody(e)}
                    >
                        {this.state.article_body}
                    </textarea>
                    <input
                        type="hidden"
                        name="article_id"
                        value={this.props.match.params.id}
                    />
                    <button className="updateBtn" onClick={e => this.submit(e)}>
                        Update
                    </button>
                </form>
            </div>
        );
    }
}
