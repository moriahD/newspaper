import React from "react";
import SetUsers from "./setusers";
import Articles from "./articles";
import Article from "./article";
import ArticleNew from "./articleNew";
import MyAccount from "./myaccount";
import Friends from "./friends";
import Chat from "./chat";
import axios from "./axios";
import { Route, BrowserRouter, Link } from "react-router-dom";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false,
            showBioEditor: false
        };
    }
    async componentDidMount() {
        // const { data } = await axios.get("/admin");
        // console.log("componentDidMount data: ", data.rows[0]);
        // this.setState(data.rows);
    }
    render() {
        return (
            <div className="adminNav">
                <BrowserRouter>
                    <div>
                        <div className="navBox">
                            <div className="profileWrap">
                                <div className="linkNav">
                                    <Link to="/admin/myaccount">
                                        My account
                                    </Link>
                                </div>
                                <div className="linkNav">
                                    <Link to="/admin/user">User </Link>
                                </div>
                                <div className="linkNav">
                                    <Link to="/admin/articles">Articles</Link>
                                </div>
                                <div className="linkNav">
                                    <Link to="/admin/category">Category</Link>
                                </div>
                            </div>
                        </div>

                        <Route path="/admin/user" component={SetUsers} />
                        <Route path="/admin/myaccount" component={MyAccount} />
                        <Route
                            exact
                            strict
                            path="/admin/articles/new"
                            component={ArticleNew}
                        />
                        <Route
                            exact
                            path="/admin/articles/:id"
                            component={Article}
                        />
                        <Route
                            exact
                            path="/admin/articles"
                            component={Articles}
                        />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}
