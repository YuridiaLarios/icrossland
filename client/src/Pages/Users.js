import React, { Component } from "react";
import { Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { VARS_CONFIG } from "../react-variables";
import axios from "axios";
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
      favStocks: [],
      searchString: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
  }

  getFavoriteStocks() {
    let favoriteStocks;
    if (this.props.favoriteStocks) {
      console.log("props were passed!");
      favoriteStocks = this.props.favoriteStocks;
    } else {
      console.log("fetch is needed!");
      axios
        .get(`${VARS_CONFIG.localhost}/api/myFavoriteStocks`, {
          params: this.state.user.sub
        })
        .then(response => {
          favoriteStocks = response.data.favoriteStocks;
        })
        .catch(error => this.setState({ error: true }));
    }
    let stringSymbols = favoriteStocks.toString();
    axios
      .get(`${VARS_CONFIG.localhost}/api/stocks/`, {
        params: {
          data: stringSymbols
        }
      })
      .then(res => this.setState({ favStocks: res.data }));
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.favoriteStocks !== prevProps.favoriteStocks) {
      let stringSymbols = this.props.favoriteStocks.toString();
      axios
        .get(`${VARS_CONFIG.localhost}/api/stocks/`, {
          params: {
            data: stringSymbols
          }
        })
        .then(res => this.setState({ favStocks: res.data }));
    }
  }

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile }, this.getFavoriteStocks);
      });
    } else {
      this.setState({ profile: userProfile }, this.getFavoriteStocks);
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
                  // favoriteStocks={this.state.favoriteStocks}
                  // getSymbolToTrack={this.props.addSymbolToTrack}
                  // deleteSymbolToTrack={this.props.deleteSymbolToTrack}
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
