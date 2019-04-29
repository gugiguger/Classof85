import React from "react";
import axios from "./axios";

export default class Uploader extends React.Component {
    constructor() {
        super();
        this.state = {};
        this.uploadFile = this.uploadFile.bind(this);
    }
    uploadFile(e){
        e.preventDefault();

        let file = document.getElementById("file");
        let uploadedFile = file.files[0];
        let formData = new FormData();
        formData.append("file", uploadedFile);
        axios
            .post("/upload", formData)
            .then(({ data }) => {
                this.props.updateProfileUrl(data.url);
            })
            .catch(function(err){
                console.log("err in axios post: ", err);
            });
    }
    render() {
        return(
            <div id="modal-mask">
                <div id="modal-wrapper">
                    <div id="modal-container">
                        <h1>Upload your profile picture</h1>
                        <input type="file" id="file" />
                        <button onClick={this.uploadFile}>Upload</button>
                    </div>
                </div>
            </div>
        );
    }
}
