import React, { Component } from 'react';
import {Card} from "react-bootstrap";
import UserProfileButton from "./UserProfileButton";

class SingleUserDiv extends Component {
  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      users: {},
    };
  }


  render(){
    return (
    <div className="col s12 m12 l4">
      <Card  style={{ width: '18rem' }}>
        <Card.Img variant="top" src={this.props.item.thumbnailFile} />
        <Card.Body>
          <Card.Title>{this.props.item.username}</Card.Title>
          <Card.Text>
            {this.props.item.email} <br></br>
            {this.props.item._id} <br></br>  <br></br>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
          </Card.Text>
          <UserProfileButton item={this.props.item} getIndividualUserProfile={this.props.getIndividualUserProfile}></UserProfileButton>
        </Card.Body>
      </Card>
    </div>
    );
  }
}

export default SingleUserDiv;
