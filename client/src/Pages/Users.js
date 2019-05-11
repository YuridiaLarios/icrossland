import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import SingleUserDiv from "../components/SingleUserDiv";
import "../Auth/Auth";
import "./Profile.css";

class Profile extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      profile: {}
    };
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
    return (
      <div>
        <h4>All users:</h4>
        {/* USERS DIVS */}
        <Row>
          {this.props.users.map(item => {
            return (
              <SingleUserDiv
                key={item._id}
                item={item}
                getIndividualUserProfile={this.props.getIndividualUserProfile}
                addUser={this.props.addUser}
                deleteUser={this.props.deleteUser}
              />
            );
          })}
        </Row>
      </div>
    );
  }
}

export default withRouter(Profile);
