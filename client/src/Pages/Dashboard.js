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
      favoriteStocks: Array.from(props.favoriteStocks),
      message: "",
      searchString: "",
      accessToken: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  getFavoriteStocks() {
    let favoriteStocksArray = Array.from(this.props.favoriteStocks);

    let favoriteStocks;
    if (favoriteStocksArray) {
      favoriteStocks = favoriteStocksArray;
    } else {
      axios
        .get(`${VARS_CONFIG.localhost}/api/myFavoriteStocks`, {
          params: this.state.user.sub
        })
        .then(response => {
          let favoriteStocksFetched = response.data.favoriteStocks;
          favoriteStocks = favoriteStocksFetched;
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
    // console.log(Array.from(this.props.favoriteStocks).join());
    // console.log(this.state.favoriteStocks.join());
    if (
      Array.from(this.props.favoriteStocks).join() !==
      this.state.favoriteStocks.join()
    ) {
      let stringSymbols = Array.from(this.props.favoriteStocks).toString();
      axios
        .get(`${VARS_CONFIG.localhost}/api/stocks/`, {
          params: {
            data: stringSymbols
          }
        })
        .then(res =>
          this.setState({
            favStocks: res.data,
            favoriteStocks: Array.from(this.props.favoriteStocks)
          })
        );
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
        // console.log("the freaking carried id = ", myId);
        // console.log("this is my profile!!!", res2.data);
      });
    });
  }

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
    // console.log(_favStocks);
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
    //   Array.from(this.props.favoriteStocks)
    // );

    const favoriteStocks = this.state.favStocks ? (
      <>
        {_favStocks.map(item => {
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
              <Col md={12} lg={4}>
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
              <Col
                md={12}
                lg={8}
                style={{ overflowX: "scroll", fontSize: "14px" }}
              >
                <div className="favStock-card-list">{favoriteStocks}</div>
              </Col>
            </Row>
          </Container>
          {/* TODO: TEST PROTECTED VS UNPROTECTED ROUTES */}
          <div className="container">
            <h3>Make a Call to the Server</h3>
            <Button onClick={this.ping.bind(this)}>Ping</Button>
            <h2> {this.state.pingMessage}</h2>

            <Button onClick={this.securedPing.bind(this)}>Call Private</Button>

            <h2> {this.state.pingSecuredMessage}</h2>

            {/* <Button onClick={this.deleteApple.bind(this)}>
              Delete Apple from favorites
            </Button> */}
            <p />
          </div>
        </div>
      </Styles>
    );
  }
}

export default Dashboard;
