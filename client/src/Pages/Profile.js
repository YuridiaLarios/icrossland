import React, { Component } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import "../Auth/Auth";
import "./Profile.css";

class Profile extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      profile: {}
    };
  }

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { profile } = this.state;
    return <p>To be updated!!!</p>;
  }
}

export default withRouter(Profile);
