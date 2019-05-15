import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { VARS_CONFIG } from "../react-variables";
import UserProfileButton from "./UserProfileButton";
import axios from "axios";
import Auth from "../Auth/Auth";

const auth = new Auth();

class SingleUserDiv extends Component {
  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      users: {}
    };
  }

  // to handle deleting an event from database
  handleDeleteSearch = deletedUser => {
    const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };
    console.log("acesstoken from singleUserDiv = ", auth.getAccessToken());

    axios({
      method: "delete",
      url: `${VARS_CONFIG.localhost}/api/users/` + deletedUser._id,
      headers
    }).then(res => {
      this.props.deleteUser(res);
      console.log(res);
    });
  };

  render() {
    let joined = this.props.item.date;
    let joinedDate = new Date(joined).toLocaleDateString();
    return (
      <Card id="individualUserCard" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={this.props.item.thumbnailFile} />
        <Card.Body>
          <Card.Title className="card-username">
            {this.props.item.username}
          </Card.Title>
          {/* <Card.Text>{this.props.item.email}</Card.Text> */}
          {/* <Card.Text>ID: {this.props.item._id}</Card.Text> */}
          <Card.Text>Joined: {joinedDate}</Card.Text>
          <UserProfileButton
            item={this.props.item}
            getIndividualUserProfile={this.props.getIndividualUserProfile}
            favoriteStocks={this.state.favoriteStocks}
            getSymbolToTrack={this.props.addSymbolToTrack}
            deleteSymbolToTrack={this.props.deleteSymbolToTrack}
          />
        </Card.Body>
      </Card>
    );
  }
}

export default SingleUserDiv;
