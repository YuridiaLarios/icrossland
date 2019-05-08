import React, { Component } from 'react';
import {Button, Card, Container} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import "../Auth/Auth";
import "./Profile.css";



class StockProfile extends Component {
   // CONSTRUCTOR
   constructor(props) {
    super(props);
    this.state = {
      user: props.user,
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
    return (
      <div className="container">
      <Button onClick={this.handleSubmit} variant="primary">All users + stocks</Button>
        <Container>
          <Card>
            <Card.Header><h2>{this.props.user.name}</h2></Card.Header>
            {/* <Card.Img className="profile-thumbnail" variant="top" src={this.props.user.thumbnailFile} /> */}
            <Card.Body>
              <Card.Title>Symbol: {this.props.user.symbol}</Card.Title>
              <Card.Text>
                Price: {this.props.user.price}
              </Card.Text>
              <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default withRouter(StockProfile);
