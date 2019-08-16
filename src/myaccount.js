import React from "react";
import axios from "./axios";
import { Link } from "react-router-dom";

export default class MyAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        const myaccount = await axios.get(`/admin/myaccount.json`);
        console.log(myaccount.data);
        this.setState(myaccount.data);
    }
    setFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
    }
    setLastName(e) {
        this.setState({
            last_name: e.target.value
        });
    }
    setEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    async updateUser(e) {
        e.preventDefault();
        try {
            const { data } = await axios.post(`/admin/updateUser.json`, {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            });
            console.log("data", data);
        } catch (err) {
            console.log(`error in /admin/updateUser.json`, err);
        }
    }
    render() {
        return (
            <div
                className="usersettingBox"
                style={{ padding: "70px 20px 20px 20px" }}
            >
                change my account information
                <br />
                <label htmlFor="first_name">First Name:</label>
                <textarea
                    name="first_name"
                    placeholder="First Name"
                    defaultValue={this.state.first_name}
                    value={this.state.first_name}
                    onChange={e => this.setFirstName(e)}
                >
                    {this.state.first_name}
                </textarea>
                <label htmlFor="last_name">Last Name:</label>
                <textarea
                    name="last_name"
                    placeholder="Last Name"
                    value={this.state.last_name}
                    onChange={e => this.setLastName(e)}
                >
                    {this.state.last_name}
                </textarea>
                <label htmlFor="email">Email:</label>
                <textarea
                    name="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={e => this.setEmail(e)}
                >
                    {this.state.email}
                </textarea>
                <label htmlFor="password">Password:</label>
                <input
                    name="password"
                    type="password"
                    onChange={e => this.setPassword(e)}
                />
                <button className="saveBtn" onClick={e => this.updateUser(e)}>
                    Save
                </button>
            </div>
        );
    }
}
