import React, { Component } from "react";
import { Button, Row } from "react-bootstrap";
import { VARS_CONFIG } from "../react-variables";
import axios from "axios";
import "./Secret.css";
import Auth from "../Auth/Auth";
import SingleUserDiv from "../components/SingleUserDiv";

const auth = new Auth();
let myId;

class Profile extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      message: "",
      accessToken: ""
    };
  }

  componentWillMount() {
    let profile = auth.getProfile();
    const { getAccessToken } = this.props.auth;
    console.log("accessToken from App.js = ", getAccessToken());
    const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };

    axios({
      method: "get",
      url: `${VARS_CONFIG.localhost}/api/currentUserID`,
      headers,
      params: profile
    }).then(res => {
      myId = res.data._id;
      localStorage.setItem("myId", res.data._id);
      axios({
        method: "get",
        url: `${VARS_CONFIG.localhost}/api/myProfile`,
        headers,
        params: myId
      }).then(res2 => {
        console.log("the freaking carried id = ", myId);
        console.log("this is my profile!!!", res2.data);
      });
    });
  }

  // ADDING USER TO UI
  // binds this method to App.js instance
  addUser2 = newUser => {
    // CREATING A NEW INSTANCE SO REACT CAN COMPARE OLD STATES TO NEW STATES
    let updatedUsers = Array.from(this.state.users);
    updatedUsers.push(newUser);
    this.setState({
      // takes an object and merges that object into the current state
      users: updatedUsers
    });
  };

  securedPing() {
    const { getAccessToken } = this.props.auth;
    console.log("acesstoken from Secret securedPing = ", auth.getAccessToken());
    const headers = { Authorization: `Bearer ${getAccessToken()}` };
    axios
      .get(`${VARS_CONFIG.localhost}/api/private`, { headers })
      .then(response =>
        this.setState({ pingSecuredMessage: response.data.message })
      )
      .catch(error => this.setState({ pingSecuredMessage: error.message }));
  }

  ping() {
    axios
      .get(`${VARS_CONFIG.localhost}/api/public`)
      .then(response => this.setState({ pingMessage: response.data.message }))
      .catch(error => this.setState({ pingMessage: error.message }));
  }

  postUser() {
    let profile = auth.getProfile();
    const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };

    axios({
      method: "post",
      url: `${VARS_CONFIG.localhost}/api/users`,
      headers,
      data: profile
    }).then(res => {
      this.props.addUser(res);
    });
  }

  getUsers() {
    const { getAccessToken } = this.props.auth;
    console.log(auth.getAccessToken());
    const headers = { Authorization: `Bearer ${getAccessToken()}` };
    axios
      .get(`${VARS_CONFIG.localhost}/api/users`, { headers })
      .then(response => this.setState({ users: response.data }))
      .catch(error => this.setState({ error: true }));
  }

  render() {
    return (
      <div>
        <h1>
          This is a super secret area. Jump back to <a href="/">Home</a>
        </h1>
        <br />
        <button onClick={this.props.auth.logout}>Logout</button>

        <div className="container">
          <h3>Make a Call to the Server</h3>
          <Button onClick={this.ping.bind(this)}>Ping</Button>
          <h2> {this.state.pingMessage}</h2>

          <Button onClick={this.securedPing.bind(this)}>Call Private</Button>

          <h2> {this.state.pingSecuredMessage}</h2>

          <Button onClick={this.postUser.bind(this)}>Post User</Button>
          <p />

          <Button onClick={this.getUsers.bind(this)}>Get all users</Button>
        </div>

        <div>
          <h4>All users:</h4>
          <Row>
            {this.state.users.map(item => {
              return (
                <SingleUserDiv
                  key={item._id}
                  item={item}
                  getIndividualUserProfile={this.props.getIndividualUserProfile}
                />
              );
            })}
          </Row>
        </div>
      </div>
    );
  }
}

export default Profile;
