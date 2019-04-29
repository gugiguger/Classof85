import React from "react";
import axios from "./axios";
import ProfilePic from "./profilepic";
import Uploader from "./uploader";
import Profile from "./profile";
import BioEditor from "./bioeditor";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            uploaderIsVisible: false
        };
        this.handleShowUploader = this.handleShowUploader.bind(this);
        this.updateProfileUrl = this.updateProfileUrl.bind(this);
    }

    handleShowUploader() {
        this.setState(() => {
            return {
                uploaderIsVisible: true
            };
        });
    }

    updateProfileUrl(url) {
        this.setState(() => {
            return {
                url: url,
                uploaderIsVisible: false
            };
        });
    }
    updateUserBio(bio) {
        console.log("updateUserBio running");
        this.setState(() => {
            console.log("this.updateUserBio: ", this.updateUserBio);
            return {
                bio: bio,
                showEditor: false
            };
        });
    }

    componentDidMount() {
        axios
            .get("/user")
            .then(result => {
                this.setState({
                    id: result.data.id,
                    first: result.data.first,
                    last: result.data.last,
                    url: result.data.url,
                    bio: result.data.bio
                });
            })
            .catch(err => {
                console.log("error in get/user: ", err);
            });
    }

    render() {
        return (
            <div>
                <Profile
                    id={this.state.id}
                    image={this.state.image}
                    first={this.state.first}
                    last={this.state.last}
                    email={this.state.email}
                    bio={this.state.bio}
                    profilePicComponent=<ProfilePic
                        profilePic={this.state.image}
                        first={this.state.first}
                        last={this.state.last}
                        email={this.state.email}
                        clickHandler={() =>
                            this.setState({ uploaderIsVisible: true })
                        }
                    />
                    bioEditor=<BioEditor
                        first={this.state.first}
                        last={this.state.last}
                        email={this.state.email}
                        bio={this.state.bio}
                        getBio={bio => {
                            this.setState({ bio: bio });
                        }}
                    />
                />
                {this.state.uploaderIsVisible && (
                    <Uploader
                        setImage={url => this.setState({ image: url })}
                        clickHandler={() =>
                            this.setState({ uploaderIsVisible: false })
                        }
                    />
                )}
                )
            </div>
        );
    }
}
