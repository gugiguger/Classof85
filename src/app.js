import React from "react";
import axios from "./axios";
import Uploader from "./uploader";
import { Profile } from "./profile";
import { Route } from "react-router-dom";


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
            <div className="main-container">
                {this.state.uploaderIsVisible && (
                    <Uploader updateProfileUrl={this.updateProfileUrl} />
                )}

                    <div>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Profile
                                    id={this.state.id}
                                    first={this.state.first}
                                    last={this.state.last}
                                    url={this.state.url}
                                    handleShowUploader={this.handleShowUploader}
                                    bio={this.state.bio}
                                    updateUserBio={this.updateUserBio}
                                />
                            )}
                        />
                    </div>

            </div>
        );
    }
}
