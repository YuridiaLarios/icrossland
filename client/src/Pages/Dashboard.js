import React, { Component } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { VARS_CONFIG } from "../react-variables";
import axios from "axios";
import Styles from "./Pages-Styles/DashboardStyles.js";
import Auth from "../Auth/Auth";
import SingleStockDiv from "../components/SingleStockDiv";

const auth = new Auth();
let myId;

class Dashboard extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      favStocks: [],
      message: "",
      searchString: "",
      accessToken: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getFavoriteStocks() {
    let favoriteStocks;
    if (this.props.favoriteStocks) {
      favoriteStocks = this.props.favoriteStocks;
    } else {
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
    let profile = auth.getProfile();
    // const { getAccessToken } = this.props.auth;
    // console.log("accessToken from Dashboard.js = ", getAccessToken());
    const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };

    axios({
      method: "get",
      url: `${VARS_CONFIG.localhost}/api/currentUserID`,
      headers,
      params: profile
    }).then(user => {
      this.setState({ user: user.data }, this.getFavoriteStocks);
      myId = user.data._id;
      localStorage.setItem("myId", user.data._id);
      axios({
        method: "get",
        url: `${VARS_CONFIG.localhost}/api/myProfile`,
        headers,
        params: myId
      }).then(res2 => {
        console.log("the freaking carried id = ", myId);
        console.log("this is my profile!!!", res2.data);
      });
    });
  }

  // // ADDING USER TO UI
  // // binds this method to App.js instance
  // addUser2 = newUser => {
  //   // CREATING A NEW INSTANCE SO REACT CAN COMPARE OLD STATES TO NEW STATES
  //   let updatedUsers = Array.from(this.state.users);
  //   updatedUsers.push(newUser);
  //   this.setState({
  //     // takes an object and merges that object into the current state
  //     users: updatedUsers
  //   });
  // };

  securedPing() {
    const { getAccessToken } = this.props.auth;
    // console.log("acesstoken from Dashboard securedPing = ", auth.getAccessToken());
    const headers = { Authorization: `Bearer ${getAccessToken()}` };
    axios
      .get(`${VARS_CONFIG.localhost}/api/private`, { headers })
      .then(response =>
        this.setState({ pingSecuredMessage: response.data.message })
      )
      .catch(error => this.setState({ pingSecuredMessage: error.message }));
  }

  ping() {
    axios
      .get(`${VARS_CONFIG.localhost}/api/public`)
      .then(response => this.setState({ pingMessage: response.data.message }))
      .catch(error => this.setState({ pingMessage: error.message }));
  }

  deleteApple() {
    this.props.deleteSymbolToTrack("AAPL");
  }

  getUsers() {
    const { getAccessToken } = this.props.auth;
    console.log(auth.getAccessToken());
    const headers = { Authorization: `Bearer ${getAccessToken()}` };
    axios
      .get(`${VARS_CONFIG.localhost}/api/users`, { headers })
      .then(response => this.setState({ users: response.data }))
      .catch(error => this.setState({ error: true }));
  }

  handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
  }

  render() {
    let _favStocks = this.state.favStocks;
    let search = this.state.searchString.trim().toLowerCase();

    if (search.length > 0) {
      _favStocks = _favStocks.filter(function(stock) {
        return stock.name.toLowerCase().match(search);
      });
    }

    let joined = this.state.user.date;
    let joinedDate = new Date(joined).toLocaleDateString();

    // console.log(
    //   "the props that arrived for favStocks:",
    //   this.props.favoriteStocks
    // );
    const favoriteStocks = this.state.favStocks ? (
      <>
        {_favStocks.map(item => {
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
      <Styles>
        <div className="DASHBOARD-body">
          <h1>
            Welcome to your Dashboard, {this.props.name}! <br />{" "}
            <a href="/" className="btn btn-blue btn-animated">
              Explore more stocks
            </a>
          </h1>
          <br />
          <Container>
            <Row>
              <Col sm={4}>
                <Card id="user-card">
                  <Card.Header id="user-card-header">
                    {this.state.user.username}
                  </Card.Header>
                  <Card.Img
                    className="profile-thumbnail"
                    variant="top"
                    src={this.state.user.thumbnailFile}
                  />
                  <Card.Body>
                    <div className="user-info">
                      <Card.Text>ID: {this.state.user._id}</Card.Text>
                      <Card.Text>Email: {this.state.user.email}</Card.Text>
                      <Card.Text>Joined: {joinedDate}</Card.Text>
                      <input
                        className="searchbar"
                        type="text"
                        value={this.state.searchString}
                        ref="search"
                        onChange={this.handleChange}
                        placeholder="Filter by Name"
                      />
                    </div>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={8} style={{ overflowX: "scroll", fontSize: "14px" }}>
                <div className="favStock-card-list">{favoriteStocks}</div>
              </Col>
            </Row>
          </Container>

          <div>
            <></>
          </div>
          <div className="container">
            <h3>Make a Call to the Server</h3>
            <Button onClick={this.ping.bind(this)}>Ping</Button>
            <h2> {this.state.pingMessage}</h2>

            <Button onClick={this.securedPing.bind(this)}>Call Private</Button>

            <h2> {this.state.pingSecuredMessage}</h2>

            <Button onClick={this.deleteApple.bind(this)}>
              Delete Apple from favorites
            </Button>
            <p />
          </div>
        </div>
      </Styles>
    );
  }
}

export default Dashboard;
