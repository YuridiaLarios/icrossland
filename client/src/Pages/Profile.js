import React, { Component } from 'react';
import {Button, Card, Container} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import "../Auth/Auth";
import "./Profile.css";



class Profile extends Component {
   // CONSTRUCTOR
   constructor(props) {
    super(props);
    this.state = {
      profile: {}
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/');
  };


  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    console.log(`this is the userProfile: ${userProfile}`)
    console.log(`this is the userProfile: ${getProfile()}`)
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
            <Card.Img className="profile-thumbnail" variant="top" src={profile.picture} />
            <Card.Body>
              <Card.Title>Nickname: {profile.nickname}</Card.Title>
              <Card.Text>
                {profile.email}
              </Card.Text>
              <pre>{JSON.stringify(profile, null, 2)}</pre>
              <Button onClick={this.handleSubmit} variant="primary">Homepage</Button>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default withRouter(Profile);
