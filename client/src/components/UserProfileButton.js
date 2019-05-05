import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import { withRouter } from 'react-router-dom';



class UserProfileButton extends Component {

  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      users: {},
      error: false
    };

    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    let path = "/userProfile";
    // this.props.history.push(path);
  }

  render() {
    return (
      <Button variant="primary">Profile</Button>
    );
  }
}
  


export default UserProfileButton;