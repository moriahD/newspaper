import React from "react";
import axios from "./axios";

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    handleChange(e) {
        this[e.target.name] = e.target.value;
    }
    submit(e) {
        e.preventDefault();
        axios
            .post("/login", {
                email: this.email, //this.state.email
                pass: this.pass //this.state.pass
            })
            .then(({ data }) => {
                if (data.success) {
                    console.log("hello");
                    location.replace("/adminMain");
                } else if (!data.success) {
                    location.replace("/");
                }
            });
    }
    render() {
        return (
            <div className="loginBox">
                {this.state.error && (
                    <div className="error">
                        Oops, something went wrong! Try again.
                    </div>
                )}
                <form>
                    <input
                        type="text"
                        name="email"
                        onChange={e => this.handleChange(e)}
                        placeholder="Email"
                    />
                    <input
                        name="pass"
                        type="current-password"
                        onChange={e => this.handleChange(e)}
                        placeholder="Password"
                    />
                    <button onClick={e => this.submit(e)}>login</button>
                </form>
            </div>
        );
    }
}

// function Login(){
//     const [error, setError] = useState(false);
//     const [email, setEmail] = useState();
//     const [pass, setPass] = useState();
//
//     function submit(){
//         axios.post('/login',{
//             email: email,
//             pass: pass
//         })
//     }
//
// }
