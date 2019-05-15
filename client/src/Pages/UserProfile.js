import React, { Component } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { VARS_CONFIG } from "../react-variables";
import SingleStockDiv from "../components/SingleStockDiv";
import Styles from "./Pages-Styles/SingleUserStyles";
import axios from "axios";
import "../Auth/Auth";
import "./Profile.css";

class UserProfile extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      error: false,
      favStocks: []
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/");
  };

  getFavoriteStocks() {
    let stringSymbols = this.state.user.favoriteStocks.toString();
    axios
      .get(`${VARS_CONFIG.localhost}/api/stocks/`, {
        params: {
          data: stringSymbols
        }
      })
      .then(res => this.setState({ favStocks: res.data }));
  }

  componentDidMount() {
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }

    if (isEmpty(this.props.user)) {
      // console.log("no props, fetch needed");
      const { getAccessToken } = this.props.auth;
      const headers = { Authorization: `Bearer ${getAccessToken()}` };
      axios
        .get(
          `${VARS_CONFIG.localhost}/api/users/${
            this.props.match.params.userId
          }`,
          { headers }
        )
        .then(response => {
          this.setState({ user: response.data }, this.getFavoriteStocks);
        })
        .catch(error => this.setState({ error: true }));
    } else {
      this.getFavoriteStocks();
    }
  }

  render() {
    const favoriteStocks = this.state.favStocks ? (
      <>
        {this.state.favStocks.map(item => {
          return (
            <SingleStockDiv
              key={item.symbol}
              item={item}
              favoriteStocks={this.props.favoriteStocks}
              getIndividualStockProfile={this.props.getIndividualStockProfile}
              getSymbolToTrack={this.props.getSymbolToTrack}
              deleteSymbolToTrack={this.props.deleteSymbolToTrack}
            />
          );
        })}
      </>
    ) : (
      <div>No stocks are been track!</div>
    );

    let joined = this.state.user.date;
    let joinedDate = new Date(joined).toLocaleDateString();

    return (
      <Styles>
        <div className="USER-body">
          <Container>
            <Card className="user-card">
              <Card.Header className="user-card-header">
                <h1>{this.state.user.username}</h1>
              </Card.Header>
              <Card.Img
                className="profile-thumbnail"
                variant="top"
                src={this.state.user.thumbnailFile}
              />
              <Card.Body>
                <Card.Text>ID: {this.state.user._id}</Card.Text>
                <Card.Text>{this.state.user.email}</Card.Text>
                <Card.Text>Joined: {joinedDate}</Card.Text>
              </Card.Body>
              <Card.Body className="user-favorite-stocks">
                <Row>{favoriteStocks}</Row>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </Styles>
    );
  }
}

export default withRouter(UserProfile);
