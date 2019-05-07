import React, { Component } from 'react';
import {Card} from "react-bootstrap";
import UserProfileButton from "./UserProfileButton";
import UserDeleteButton from "./UserDeleteButton";
import axios from "axios";
import Auth from "../Auth/Auth";


const auth = new Auth();


class SingleUserDiv extends Component {
  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      users: {},
    };
  }



   // to handle deleting an event from database
   handleDeleteSearch = (deletedUser) => {
    // const url = "http://localhost:3000/api/users/" + deletedUser._id;

    // fetch(url, { //endpoint
    //     method: 'delete'
    //   })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .then((deletedUser) => {
    //     this.props.deleteEvent(deletedUser)
    //   })
    //   .catch((error) => {
    //     this.setState({
    //       error: true
    //     })
    //   });
    // // console.log(deletedUser._id);
    // // this.props.deleteUser(deletedUser)

    const headers = { 'Authorization': `Bearer ${auth.getAccessToken()}`}
    console.log(auth.getAccessToken());
  
      axios({
        method: "delete",
        // url: "http://localhost:3000/api/users/" + deletedUser._id,
        url: "/api/users/" + deletedUser._id,
        headers,
      }).then((res) => {
        this.props.deleteUser(res)
        console.log(res);
      });

  };


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
          <UserDeleteButton item={this.props.item} handleDeleteSearch={this.handleDeleteSearch}></UserDeleteButton>
        </Card.Body>
      </Card>
    </div>
    );
  }
}

export default SingleUserDiv;
