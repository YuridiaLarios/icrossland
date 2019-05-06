import auth0 from "auth0-js";
import jwtDecode from "jwt-decode";
import axios from 'axios';

/* eslint no-restricted-globals:0*/
const LOGIN_SUCCESS_PAGE = "/secret";
// const LOGIN_FAILURE_PAGE = "/";

export default class Auth {

  accessToken;
  idToken;
  expiresAt;
  userProfile;

  auth0 = new auth0.WebAuth({
    domain: "princess-minina.auth0.com",
    clientID: "D7qof03S1ZPHBdDrX00CHROyOdQlKqM2",
    redirectURI: "/callback",
    // redirectURI: "http://localhost:3000/callback",
    audience: "https://princess-minina.auth0.com/userinfo",
    responseType: "token id_token",
    scope: "openid profile email read:messages"
  });

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    // this.renewSession = this.renewSession.bind(this);
    this.getProfile = this.getProfile.bind(this);
    this.checkForProfile = this.checkForProfile.bind(this);
  }

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResults) => {
      if (authResults && authResults.accessToken && authResults.idToken) {
        this.setSession(authResults);
        this.checkForProfile();
      } else if (err) {
        // location.pathname = LOGIN_FAILURE_PAGE;
        history.replace('/');
        alert(`Error: ${err.error}. Check the console for further details.`);
        console.log(err);
      }
    });
  }

  checkForProfile() {
    /**********************************************************************
      get profile into database!
    **********************************************************************/
    let profile = this.getProfile();

    const headers = {
      'Authorization': `Bearer ${this.getAccessToken()}`
    }

    axios({
      method: "post",
      // url: "http://localhost:3000/api/user",
       url: "/api/user",
      headers,
      data: profile
    }).then(function (res) {
      console.log(`the response is: ${res}`);
    });

  }


  setSession(authResults) {
    let expireAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());

    this.expiresAt = expireAt;
    this.accessToken = authResults.accessToken;
    this.idToken = authResults.idToken;
    localStorage.setItem('isLoggedIn', 'true');

    localStorage.setItem("access_token", authResults.accessToken);
    localStorage.setItem("id_token", authResults.idToken);
    localStorage.setItem("expires_at", expireAt);
    location.hash = "";
    location.pathname = LOGIN_SUCCESS_PAGE;
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  isAuthenticated() {
    let expireAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expireAt;
  }

  logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem('isLoggedIn');

    // Remove tokens, expiry time and userProfile info
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;
    this.userProfile = null;

    // location.pathname = LOGIN_FAILURE_PAGE;
    // history.replace('/');
  }

  getProfile() {
    if (localStorage.getItem("id_token")) {
      this.userProfile = jwtDecode(localStorage.getItem("id_token"));
      return this.userProfile;
    } else {
      return {};
    }
  }
  // getProfile(cb) {
  //   this.auth0.client.userInfo(this.accessToken, (err, profile) => {
  //     if (profile) {
  //       this.userProfile = profile;
  //     }
  //     cb(err, profile);
  //   });
  // }
}