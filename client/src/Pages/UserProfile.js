import React, { Component } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { VARS_CONFIG } from "../react-variables";
import axios from "axios";
import "../Auth/Auth";
import "./Profile.css";

class UserProfile extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      profile: {},
      error: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/");
  };

  componentWillMount() {
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }

    if (isEmpty(this.props.user)) {
      console.log("no props, fetch needed");
      const { getAccessToken } = this.props.auth;
      // console.log(this.props.auth.getAccessToken);
      const headers = { Authorization: `Bearer ${getAccessToken()}` };
      axios
        .get(
          `${VARS_CONFIG.localhost}/api/users/${
            this.props.match.params.userId
          }`,
          { headers }
        )
        .then(response => {
          this.setState({ user: response.data });
        })
        .catch(error => this.setState({ error: true }));
    }
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
      console.log("user data from parent component: ", this.props.user);
    } else {
      this.setState({ profile: userProfile });
      console.log("user data from parent component: ", this.props.user);
    }
  }

  render() {
    return (
      <div className="container">
        <Button onClick={this.handleSubmit} variant="primary">
          All users
        </Button>
        <Container>
          <Card>
            <Card.Header>
              <h2>{this.state.user.username}</h2>
            </Card.Header>
            <Card.Img
              className="profile-thumbnail"
              variant="top"
              src={this.state.user.thumbnailFile}
            />
            <Card.Body>
              <Card.Title>ID: {this.state.user._id}</Card.Title>
              <Card.Text>{this.state.user.email}</Card.Text>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default withRouter(UserProfile);
