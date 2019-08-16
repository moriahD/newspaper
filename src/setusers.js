import React from "react";
import axios from "./axios";
import FriendButton from "./friendButton";
import WallPost from "./wallpost";
export default class SetUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {}
    editorChange() {
        this.setState({
            isEditor: !this.state.isEditor
        });
    }
    reporterChange() {
        this.setState({
            isReporter: !this.state.isReporter
        });
    }
    setFirstName(e) {
        this.setState({
            first_name: e.target.value
        });
        console.log(e.target.value);
    }
    setLastName(e) {
        this.setState({
            last_name: e.target.value
        });
        console.log(e.target.value);
    }
    setEmail(e) {
        this.setState({
            email: e.target.value
        });
        console.log(e.target.value);
    }
    setPassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    async saveUser(e) {
        e.preventDefault();
        console.log("state", this.state);
        try {
            const { data } = await axios.post(`/admin/adduser.json`, {
                isReporter: this.state.isReporter,
                isEditor: this.state.isEditor,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password
            });
            console.log("data", data);
            location.replace(`/admin/articles/`);
        } catch (err) {
            console.log(`error in /admin/article/new.json`, err);
        }
    }
    render() {
        return (
            <div className="usersettingBox">
                <p>Add new reporter</p>
                Choose Role:
                <br />
                <input
                    id="isReporter"
                    className="userRole"
                    type="checkbox"
                    name="isReporter"
                    value="1"
                    onChange={e => this.reporterChange(e)}
                />
                <label htmlFor="isReporter">Reporter</label>
                <input
                    id="isEditor"
                    className="userRole"
                    type="checkbox"
                    name="isEditor"
                    value="1"
                    onChange={e => this.editorChange()}
                />
                <label htmlFor="isEditor">Editor</label>
                <br />
                <label htmlFor="first_name">First Name:</label>
                <textarea
                    name="first_name"
                    placeholder="First Name"
                    onChange={e => this.setFirstName(e)}
                >
                    {this.state.first_name}
                </textarea>
                <label htmlFor="last_name">Last Name:</label>
                <textarea
                    name="last_name"
                    placeholder="Last Name"
                    onChange={e => this.setLastName(e)}
                >
                    {this.state.last_name}
                </textarea>
                <label htmlFor="email">Email:</label>
                <textarea
                    name="email"
                    placeholder="Email"
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
                <button className="saveBtn" onClick={e => this.saveUser(e)}>
                    Save
                </button>
            </div>
        );
    }
}
//
