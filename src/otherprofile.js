import React from "react";
import axios from "./axios";

export default class OtherProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        let self = this;
        let id = this.props.match.params.id;

        axios
            .get("/user/" + id + "/json")
            .then(({ data }) => {
                console.log(data);
                if (data.redirect) {
                    this.props.history.push("/");
                } else {
                    self.setState({
                        first: data.first,
                        last: data.last,
                        url: data.url,
                        bio: data.bio,
                        id: data.id
                    });
                }
            })
            .catch(err => {
                console.log("error in get/user ID", err);
            });
    }
    render() {
        return (
            <div>
                <div className="otherPic">
                    <img src={this.state.url} />
                </div>
                <div className="otherUser">
                    <h1>
                        {this.state.first} {this.state.last}
                    </h1>
                    <p>{this.state.bio}</p>
                </div>
            </div>
        );
    }
}
