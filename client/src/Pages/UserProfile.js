import React, { Component } from "react";
import { Button, Card, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { VARS_CONFIG } from "../react-variables";
import SingleStockDiv from "../components/SingleStockDiv";
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
      console.log("no props, fetch needed");
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
              getIndividualStockProfile={this.props.getIndividualStockProfile}
              getSymbolToTrack={this.props.getSymbolToTrack}
            />
          );
        })}
      </>
    ) : (
      <div>No stocks are been track!</div>
    );
    return (
      <div className="container">
        <Container>
          <Card>
            <Card.Header>
              <h2>{this.state.user.username}</h2>
            </Card.Header>
            <Card.Img
              className="profile-thumbnail"
              variant="top"
              src={this.state.user.thumbnailFile}
            />
            <Card.Body>
              <Card.Title>ID: {this.state.user._id}</Card.Title>
              <Card.Text>{this.state.user.email}</Card.Text>
              <Row>{favoriteStocks}</Row>
            </Card.Body>
          </Card>
        </Container>
      </div>
    );
  }
}

export default withRouter(UserProfile);
