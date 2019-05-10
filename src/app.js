import React from 'react';
import axios from './axios';
import ProfPic from './profile_pic';
import Uploader from './pic_uploader';
import Profile from './profile';
import OtherProfile from './other_profile';
import Connections from './social_connections';
import WhoIsOnline from './online_users';
import Chat from './chat';
import { BrowserRouter as Router, HashRouter, Route } from "react-router-dom";
import Registration from "./register";
import Login from "./login";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleUploader: false, visibleEditBio: false
        };
        this.displayUploader = this.displayUploader.bind(this);
        this.hideUploader = this.hideUploader.bind(this);
        this.selectPic = this.selectPic.bind(this);
        this.displayEditBio = this.displayEditBio.bind(this);
        this.setBio = this.setBio.bind(this);
    }

    displayUploader() {
        this.setState({
            visibleUploader: true
        });
    }

    hideUploader() {
        this.setState({
            visibleUploader: false
        });
    }

    selectPic(pic) {
        this.setState({pic});
    }

    displayEditBio() {
        this.setState({
            visibleEditBio: true
        });
    }

    setBio(bio) {
        this.setState({bio, visibleEditBio: false});
    }

    componentDidMount() {
        axios.get('/user').then(({data}) => {
            if (data.id) {
                this.setState(data);
            }
        });
    }

    render() {
        if (!this.state.id) {
            return <img src='/images/Pacman-1s-200px.gif'/>;
        }
        return (
            <div className="app-container">
                <div className="menubar">
                    <div className="menu-item">File
                        <div className="menu">
                            <div className="menu-content">
                                <a className="link" href="./">Home</a><br />
                                <a className="link" href="./connections">Friends</a><br />
                                <a className="link" href="./online-users">Check who is online</a><br />
                                <a className="link" href="./chat">Chat</a><br />
                                <hr/>
                                <p>Print</p>
                                <hr/>
                                <a className="link" href="./logout">Logout</a>
                            </div>
                        </div>
                    </div>
                    <div className="menu-item">Edit</div>
                    <div className="menu-item">View</div>
                    <div className="menu-item">Search</div>
                    <div className="menu-item">Run</div>
                    <div className="menu-item">Debug</div>
                    <div className="right">
                        <div className="menu-item">Help</div>
                    </div>
                </div>
                <div className="title-border">
                    <p className="title">AUTOEXEC.BAT</p>
                    <div className="container">
                        <div className="scroll-content">
                            <div className='welcomeLogo'>
                                <img src="/images/Tabasco-01.png" />
                            </div>
                            <div className="desktopIcon">
                                <div className="icon iconProfPic">
                                    <ProfPic
                                        pic={this.state.pic}
                                        fname={this.state.fname}
                                        sname={this.state.sname}
                                        onClick={this.displayUploader}
                                    />
                                    <p>My_Profile.exe</p>
                                </div>
                                <div className="icon">
                                    <img className="img-icon" src="/images/kisspng-pikachu-misty-pixel-art-charmander-pokmon-pixilart-kelden-i-by-howsitgoin-5b7b8cd8034745.5324673015348236400134.png" />
                                    <p>charmander.exe</p>
                                </div>
                                <div className="icon">
                                    <img className="img-icon" src="/images/kisspng-pokmon-go-pikachu-pokmon-x-and-y-pixel-art-5b10e240be8551.6159399115278331527804.png" />
                                    <p>jigglypuff.exe</p>
                                </div>
                                <div className="icon">
                                    <img className="img-icon" src="/images/kisspng-super-mario-bros-8-bit-mushroom-mario-background-5b0dd6823a5196.5604745715276335382389.png" />
                                    <p>magic_mushroom.bat</p>
                                </div>
                            </div>
                            {this.state.visibleUploader && <Uploader selectPic={this.selectPic} hideUploader={this.hideUploader}/>}
                        </div>
                    </div>
                </div>




                <div className="card-container">
                    <div className="app-card">
                        <div className="regTitle">
                            <div className="buttons">
                                <div className="close">
                                </div>
                                <div className="resize">
                                </div>
                                <div className="expand">
                                </div>
                            </div>
                            <span className="white">NOTEPAD.TXT</span>
                        </div>
                        <div className="content">
                            <div className='app-content'>
                                <Router>
                                    <div>
                                        <Route
                                            exact
                                            path="/"
                                            render={() => (
                                                <Profile
                                                    id={this.state.id}
                                                    fname={this.state.fname}
                                                    sname={this.state.sname}
                                                    pic={this.state.pic}
                                                    onClick={this.displayUploader}
                                                    bio={this.state.bio}
                                                    setBio={this.setBio}
                                                    displayEditBio= {this.displayEditBio}
                                                    visibleEditBio= {this.state.visibleEditBio}
                                                />
                                            )}
                                        />
                                        <Route path="/user/:id" component={OtherProfile} />
                                        <Route
                                            path="/connections"
                                            render={() => (
                                                <Connections/>
                                            )}
                                        />
                                        <Route
                                            path="/online-users"
                                            render={() => (
                                                <WhoIsOnline/>
                                            )}
                                        />
                                        <Route
                                            path="/chat"
                                            render={() => (
                                                <Chat/>
                                            )}
                                        />
                                    </div>
                                </Router>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer">
                    <p>&lt;Shift+F1=Help&gt; &lt;F6=Window&gt; &lt;F2=Subs&gt; &lt;F8=Step&gt;</p>
                </div>
            </div>
        );
    }
}

