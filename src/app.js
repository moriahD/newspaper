import React from "react";
import Uploader from "./uploader";
import ProfilePic from "./profilepic";
import Profile from "./profile";
import BioEditor from "./bioeditor";
import OtherProfile from "./otherprofile";
import FindPeople from "./findpeople";
import Friends from "./friends";
import Chat from "./chat";
import WallPost from "./wallpost";
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
            <div className="profileWrap">
                <BrowserRouter>
                    <div>
                        <div className="navBox">
                            <Link to="/">
                                <img
                                    className="logoSmall"
                                    src="/images/logo.png"
                                    alt="logo"
                                />
                            </Link>

                            <div className="profileWrap">
                                <div className="linkNav">
                                    <Link to="/findpeople">Find People</Link>
                                </div>
                                <div className="linkNav">
                                    <Link to="/friends">My Friends</Link>
                                </div>
                                <div className="linkNav">
                                    <Link to="/chat">Chat with friends</Link>
                                </div>
                                <ProfilePic
                                    image={this.state.image}
                                    first={this.state.first_name}
                                    last={this.state.last_name}
                                    onClick={() =>
                                        this.setState({
                                            uploaderIsVisible: true
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <Route
                            exact
                            path="/"
                            render={props => {
                                return (
                                    <Profile
                                        first={this.state.first_name}
                                        last={this.state.last_name}
                                        bio={this.state.bio}
                                        profilePic={
                                            <ProfilePic
                                                id={this.state.id}
                                                first={this.state.first_name}
                                                last={this.state.last_name}
                                                image={this.state.image}
                                                onClick={this.showUploader}
                                            />
                                        }
                                        bioEditor={
                                            <BioEditor
                                                onClick={() =>
                                                    this.setState({
                                                        showBioEditor: true
                                                    })
                                                }
                                                bio={this.state.bio}
                                                setBio={bio =>
                                                    this.setState({ bio: bio })
                                                }
                                            />
                                        }
                                    />
                                );
                            }}
                        />

                        <Route path="/user/:id" component={OtherProfile} />
                        <Route path="/findpeople" component={FindPeople} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} />
                    </div>
                </BrowserRouter>

                {this.state.uploaderIsVisible && (
                    <Uploader
                        onClick={() =>
                            this.setState({
                                uploaderIsVisible: false
                            })
                        }
                        done={image => this.setState({ image })}
                    />
                )}
            </div>
        );
    }
}
