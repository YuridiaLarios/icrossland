import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import { withRouter } from 'react-router-dom';



class UserProfileButton extends Component {

  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      users: {}
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history } = this.props;

    // let profileUserValues = {
    //   username: this.props.item.username,
    //   _id: this.props.item._id
    // }
    let profileUserValues = this.props.item;
    history.push(`/userProfile/${this.props.item._id}`);

    this.props.getIndividualUserProfile(profileUserValues);
  };

  render() {
    return (
      <Button variant="primary" onClick={this.handleSubmit} >Profile</Button>
    );
  }
}
  


export default withRouter(UserProfileButton);