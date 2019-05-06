import React, { Component } from 'react';
import {Button, Card, Container} from "react-bootstrap";
import "../Auth/Auth";
import "./Profile.css";



class UserProfile extends Component {
   // CONSTRUCTOR
   constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      profile: {}
    }
  }



  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
      console.log("user data from parent component: ", this.props.user)
    } else {
      this.setState({ profile: userProfile });
      console.log("user data from parent component: ", this.props.user)

    }
  }

  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <Container>
          <Card>
            <Card.Header><h2>{this.props.user.username}</h2></Card.Header>
            <Card.Img className="profile-thumbnail" variant="top" src={this.props.user.thumbnailFile} />
            <Card.Body>
              <Card.Title>ID: {this.props.user._id}</Card.Title>
              <Card.Text>
                {this.props.user.email}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
              <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default UserProfile;
