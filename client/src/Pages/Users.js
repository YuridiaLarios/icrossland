import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import SingleUserDiv from "../components/SingleUserDiv";
import Styles from "./Pages-Styles/AllUsersStyles";
import "../Auth/Auth";
import "./Profile.css";

class Profile extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      users: props.users,
      profile: {},
      searchString: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
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
    let _users = this.props.users;
    let search = this.state.searchString.trim().toLowerCase();

    if (search.length > 0) {
      _users = _users.filter(function(user) {
        return user.username.toLowerCase().match(search);
      });
    }
    return (
      <Styles>
        <div className="USERS-body">
          <h1>All Users</h1>{" "}
          <input
            className="searchbar"
            type="text"
            value={this.state.searchString}
            ref="search"
            onChange={this.handleChange}
            placeholder="Filter by Name"
          />
          {/* USERS DIVS */}
          <Row sm={6} md={6} lg={4} className="usersContainer">
            {_users.map(item => {
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
      </Styles>
    );
  }
}

export default withRouter(Profile);
