import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class Registration extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        // this.submit = this.submit.bind(this); instead of {this.submit} and binding , write function name below like this-> <button onClick={e=>this.submit()}>
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
        // this.setState({ [e.target.name]: e.target.value }); -->this is not neccessary because we don't have to render immidietly on this page
    }
    submit(e) {
        e.preventDefault();
        axios
            .post("/register", {
                first: this.first, //this.state.first ->if we set State above
                last: this.last, //this.state.last
                email: this.email, //this.state.email
                pass: this.pass //this.state.pass
            })
            .then(({ data }) => {
                if (data.success) {
                    location.replace("/");
                } else {
                    this.setState({
                        error: true
                    });
                }
            });
    }
    render() {
        return (
            <div>
                {this.state.error && <div className="error">Oops!</div>}
                <form>
                    <input
                        name="first"
                        type="text"
                        onChange={e => this.handleChange(e)}
                        placeholder="First Name"
                    />
                    <input
                        name="last"
                        type="text"
                        onChange={e => this.handleChange(e)}
                        placeholder="Last Name"
                    />
                    <input
                        name="email"
                        type="text"
                        onChange={e => this.handleChange(e)}
                        placeholder="Email"
                    />
                    <input
                        name="pass"
                        type="current-password"
                        onChange={e => this.handleChange(e)}
                        placeholder="password"
                    />
                    <div>
                        <button onClick={e => this.submit(e)}>register</button>
                    </div>
                </form>
                <p>Already a member?</p>
                <Link to="/login">Click here to Log In!</Link>
            </div>
        );
    }
}
