import React from 'react';
import Registration from './register';
import Login from './login';
import { HashRouter, Route } from 'react-router-dom';


export default function Welcome(props) {
    return (

        <div className='welcome'>
            <div className="menubar">
                <div className="menu-item">File
                    <div className="menu">
                        <div className="menu-content">
                            <p>New</p>
                            <p>Open...</p>
                            <p>Save</p>
                            <p>Save As...</p>
                            <hr/>
                            <p>Print</p>
                            <hr/>
                            <p>Exit</p>
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
                            <div className="icon">
                                <img className="img-icon" src="/images/package.png" />
                                <p>MS.DOS</p>
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
                        <HashRouter>
                            <div className="card-container">
                                <div className="card">
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
                                    <div className="content white">
                                        <div className='forms'>
                                            <Route exact path="/" component={Registration}/>
                                            <Route path="/login" component={Login}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </HashRouter>
                    </div>
                </div>
            </div>

            <div className="footer">
                <p>&lt;Shift+F1=Help&gt; &lt;F6=Window&gt; &lt;F2=Subs&gt; &lt;F8=Step&gt;</p>
            </div>
        </div>
    );
}