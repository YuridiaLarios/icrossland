import React, { Component } from 'react';
import {Button} from "react-bootstrap";
// import { withRouter } from 'react-router-dom';



class UserDeleteButton extends Component {

  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      users: {}
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const userToBeDeleted = this.props.item;
    console.log(userToBeDeleted);
    this.props.handleDeleteSearch(userToBeDeleted);

  };

  render() {
    return (
      <Button variant="primary" onClick={this.handleSubmit} >Delete Me</Button>
    );
  }
}
  


export default UserDeleteButton;