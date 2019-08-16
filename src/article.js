import React from "react";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import axios from "./axios";
import UploadImage from "./uploadImage";

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        const { id } = this.props.match.params;

        const aritlce = await axios.get(`/admin/article/${id}.json`);
        console.log(aritlce.data);
        this.setState(aritlce.data);
        // const s = document.createElement("script");
        // s.type = "text/javascript";
        // s.async = true;
        // s.innerHTML = "CKEDITOR.replace( 'article_body' );";
        // document.body.appendChild(s);
    }
    changeTitle(e) {
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
    changeArticleBodyByCK(e) {
        this.setState({
            article_body: e
        });
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
        const { id } = this.props.match.params;
        console.log("state", this.state);
        try {
            const { data } = await axios.post(`/admin/article/${id}.json`, {
                editTitle: this.state.title,
                editDescription: this.state.description,
                editArticleBody: this.state.article_body,
                editImage: this.state.image
            });
            console.log("data", data);
        } catch (err) {
            console.log(`error in /admin/article/${id}.json`, err);
        }
    }

    render() {
        return (
            <div className="articleFormWrap">
                <form>
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
                        defaultValue={this.state.title}
                        value={this.state.title}
                        onChange={e => this.changeTitle(e)}
                    >
                        {this.state.title}
                    </textarea>
                    <label htmlFor="description">Description:</label>

                    <textarea
                        name="description"
                        defaultValue={this.state.description}
                        value={this.state.description}
                        onChange={e => this.changeDesc(e)}
                    >
                        {this.state.description}
                    </textarea>

                    <label htmlFor="article_body">Article Body:</label>

                    <textarea
                        id="article_body"
                        name="article_body"
                        defaultValue={this.state.article_body}
                        value={this.state.article_body}
                        onChange={e => this.changeArticleBody(e)}
                    >
                        {this.state.article_body}
                    </textarea>
                    <CKEditor
                        editor={ClassicEditor}
                        data={this.state.article_body}
                        onInit={editor => {
                            // You can store the "editor" and use when it is needed.
                            console.log("Editor is ready to use!", editor);
                        }}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                            this.changeArticleBodyByCK(data);
                        }}
                        onBlur={editor => {
                            console.log("Blur.", editor);
                        }}
                        onFocus={editor => {
                            console.log("Focus.", editor);
                        }}
                    />
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
