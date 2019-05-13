import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { VARS_CONFIG } from "../react-variables";
import axios from "axios";
import styled from "styled-components";
import "./Dashboard.css";
import Auth from "../Auth/Auth";
import SingleStockDiv from "../components/SingleStockDiv";

const Styles = styled.div`
  .DASHBOARD-body {
    margin-top: 0px;
    background: radial-gradient(#e5e5e5, #ffff, #e5e5e5);
    // background: green;
    padding: 50px;
    padding-top: 50px;
  }
  h1 {
    font-family: "initial";
  }

  .btn {
    margin: 10px;
  }

  .btn:link,
  .btn:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 12px 20px;
    display: inline-block;
    border-radius: 100px;
    transition: all 0.2s;
    margin: 20px;
  }

  .btn:hover {
    opacity: 0.7;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgb(105, 105, 105);
  }

  .btn:active {
    transform: translateY(-1px);
    box-shadow: 0 25px 40px rgba(0, 0, 0, 0.2);
  }

  .btn-blue {
    background-color: rgb(41, 128, 185);
    color: white;
  }

  #user-card {
    margin-bottom: 45px;
    margin-top: 0px;
    box-shadow: 0px 0px 10px -8px rgba(0, 0, 0, 1);
    border-radius: 15px 50px;
    width: 500px;
    display: flex;
    font-family: "initial";
    z-index: 2;
    height: 100%;
  }

  #user-card-header {
    text-transform: uppercase;
    border-radius: 10px 50px 0px 0px;
    padding: 20px;
  }

  .profile-thumbnail {
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 30px;
    width: 200px;
    border-radius: 50%;
  }

  .user-info {
    font-weight: bold;
    font-size: 16px;
    color: #696969;
    margin-top: 0px;
    margin-bottom: 30px;
    padding: 10px;
  }

  .app-card-list {
    // background-color: green;
    display: inline-block;
    margin-left: 40px;
    white-space: nowrap;
  }

  #stock-card {
    // background-color: red;
    display: inline-block;
    margin: 10px;
    white-space: auto;
  }

  #stock-card {
    @media (min-width: 768px) {
      width: 80%;
      white-space: nowrap;
      margin-top: 0;
    }
  }

  .card-body {
    white-space: normal;
    font-family: "initial";
    font-size: 1.15em;
  }
  .stockSymbol {
    font-weight: bold;
  }

  .stockDayChange {
    font-size: 32px;
    padding: 10px 1px;
    font-weight: bold;
    margin-bottom: 0px;
  }

  .green-positive {
    color: #008000;
    border: solid 2px #008000;
    border-radius: 20px;
    margin: 0px;
  }

  .red-negative {
    color: #ff0000;
    border: solid 2px #ff0000;
    border-radius: 20px;
    margin: 0px;
  }
  .small-text {
    display: block;
    margin-left: 18px;
    font-size: 18px;
  }

  .stockOpenPrice {
    font-size: 22px;
    font-weight: bold;
  }
`;
const auth = new Auth();
let myId;

class Dashboard extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      user: {},
      favStocks: [],
      message: "",
      searchString: "",
      accessToken: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

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
    }).then(res => {
      this.setState({ user: res.data }, this.getFavoriteStocks);
      myId = res.data._id;
      localStorage.setItem("myId", res.data._id);
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

  // ADDING USER TO UI
  // binds this method to App.js instance
  addUser2 = newUser => {
    // CREATING A NEW INSTANCE SO REACT CAN COMPARE OLD STATES TO NEW STATES
    let updatedUsers = Array.from(this.state.users);
    updatedUsers.push(newUser);
    this.setState({
      // takes an object and merges that object into the current state
      users: updatedUsers
    });
  };

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

  postUser() {
    let profile = auth.getProfile();
    const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };

    axios({
      method: "post",
      url: `${VARS_CONFIG.localhost}/api/users`,
      headers,
      data: profile
    }).then(res => {
      this.props.addUser(res);
    });
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
                <div className="app-card-list" id="app-card-list">
                  {favoriteStocks}
                </div>
              </Col>
            </Row>
          </Container>

          <div>
            <></>
          </div>
          {/* <div className="container">
            <h3>Make a Call to the Server</h3>
            <Button onClick={this.ping.bind(this)}>Ping</Button>
            <h2> {this.state.pingMessage}</h2>

            <Button onClick={this.securedPing.bind(this)}>Call Private</Button>

            <h2> {this.state.pingSecuredMessage}</h2>

            <Button onClick={this.postUser.bind(this)}>Post User</Button>
            <p />
          </div> */}
        </div>
      </Styles>
    );
  }
}

export default Dashboard;
