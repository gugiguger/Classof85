import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware} from 'redux';
import reduxPromise from 'redux-promise';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducer from './reducer';
import {Provider} from 'react-redux';
const store = createStore(reducer, composeWithDevTools(applyMiddleware(reduxPromise)));
import { getSocket } from "./socket";
import Welcome from './welcome';
import App from './app';

let elem;

if (location.pathname == '/welcome') {
    elem = <Welcome />;
} else {
    getSocket(store);
    elem = (
        <Provider store = {store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(
    elem,
    document.querySelector('main')
);
