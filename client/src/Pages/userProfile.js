import React, { Component } from 'react';
import {Button, Card, Container} from "react-bootstrap";
import "../Auth/Auth";
import "./Profile.css";



class Profile extends Component {
   // CONSTRUCTOR
   constructor(props) {
    super(props);
    this.state = {
      userProfile: {},
      profile: {}
    }
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
    return (
      <div className="container">
        <Container>
          <Card>
            <Card.Header><h2>{profile.name}</h2></Card.Header>
            <Card.Body>
            <Card.Img className="profile-thumbnail" variant="top" src={profile.picture} />
              <Card.Title>Nickname: {profile.nickname}</Card.Title>
              <Card.Text>
                {profile.email}
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
              <pre>{JSON.stringify(profile, null, 2)}</pre>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default Profile;
