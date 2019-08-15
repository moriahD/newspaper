import React from "react";

import axios from "./axios";

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
    }
    // const [val, setVal] = useState();
    // var id,
    //     reporter_id,
    //     category_id,
    //     title,
    //     description,
    //     article_body,
    //     last_update,
    //     created_at = "";
    // id = props.match.params.id;

    // useEffect(() => {
    //     (async () => {
    //         const request = await axios.get(`/admin/article/${id}.json`);
    //         var data = request.data;
    //         setState({ article: data });
    //     })();
    // }, []);

    render() {
        return (
            <div className="articleFormWrap">
                <form>
                    <input
                        type="text"
                        name="title"
                        placeholder="title"
                        value={this.state.title}
                    />
                    <textarea name="description" value={this.state.description}>
                        {this.state.description}
                    </textarea>

                    <textarea
                        name="article_body"
                        value={this.state.article_body}
                    >
                        {this.state.article_body}
                    </textarea>
                    <input
                        type="hidden"
                        name="article_id"
                        value={this.props.match.params.id}
                    />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
