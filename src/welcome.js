import React from "react";
import Registration from "./registration";
import { HashRouter, Route, Link } from "react-router-dom";
import Login from "./login";

export default class Welcome extends React.Component {
    render() {
        return (
            <div className="welcome">
                <div className="start">My social Network</div>
                <HashRouter>
                    <div>
                        <Route path="/register" component={Registration} />
                        <Route path="/login" component={Login} />
                        <h3>
                            <Link to="/register"> Registration </Link>
                        </h3>
                        <h3>
                            <Link to="/login"> Login </Link>
                        </h3>
                    </div>
                </HashRouter>
            </div>
        );
    }
}
