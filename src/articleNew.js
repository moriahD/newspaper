import React from "react";

import axios from "./axios";

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
    async submit(e) {
        e.preventDefault();
        console.log("state", this.state);
        try {
            const { data } = await axios.post(`/admin/article/new.json`, {
                editTitle: this.state.title,
                editDescription: this.state.description,
                editArticleBody: this.state.article_body
            });
            console.log("data", data);
            location.replace(`/admin/articles/${data.id}`);
        } catch (err) {
            console.log(`error in /admin/article/new.json`, err);
        }
    }

    render() {
        return (
            <div className="articleFormWrap">
                <form>
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
                        name="article_body"
                        defaultValue={this.state.article_body}
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
