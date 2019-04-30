import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Auth from "./Auth";

const auth = new Auth();

let state = {};
window.setState = (changes) => {
  state = Object.assign({}, state, changes);

  ReactDOM.render(<App{...state} />, document.getElementById('root'));

};
/* eslint no-restricted-globals: 0*/

let username = auth.getProfile().given_name || "human";
let initialState = {
  name: username,
  location: location.pathname.replace(/^\/?|\/$/g, ""),
  auth
};

window.setState(initialState);
serviceWorker.unregister();
