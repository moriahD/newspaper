import React from "react";
// import Registration from "./registration";
import Login from "./login";
import { HashRouter, Route } from "react-router-dom";

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.submit = this.submit.bind(this); instead of {this.submit} and binding , write function name below like this-> <button onClick={e=>this.submit()}>
    }
    render() {
        return (
            <HashRouter>
                <div className="adminBox">
                    <p>Welcome!</p>

                    {this.state.error && <div className="error">Oops!</div>}

                    <div>
                        <Route exact path="/" component={Login} />
                    </div>
                </div>
            </HashRouter>
        );
    }
}
