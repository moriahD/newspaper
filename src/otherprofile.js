import React from "react";
import axios from "./axios";
import FriendButton from "./friendButton";
import WallPost from "./wallpost";
export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    async componentDidMount() {
        const { id } = this.props.match.params;

        console.log("this.props: ", this.props);
        const { data } = await axios.get(`/user/${id}.json`);
        console.log("data: ", data);
        if (data.sameUser) {
            this.props.history.push("/");
        }
        this.setState(data.user.rows[0]);
        console.log("data.user: ", data.user.rows[0]);
    }
    render() {
        return (
            <div className="profileBox">
                <div className="profileImg">
                    <img src={this.state.image} />
                    <FriendButton
                        otherProfileId={this.props.match.params.id}
                        otherProfileName={this.state.first_name}
                    />
                </div>
                <div className="wrapBioAndWallPost">
                    <div className="bioeditorBox">
                        <h1>
                            {this.state.first_name} {this.state.last_name}
                        </h1>

                        <p>{this.state.bio ? this.state.bio : "No bio yet"}</p>
                    </div>
                    <WallPost
                        friendProfileId={this.props.match.params.id}
                        frienProfileFirstName={this.state.first_name}
                    />
                </div>
            </div>
        );
    }
}
//
