import React, { Component } from "react";
import { Button, Card, Container } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { VARS_CONFIG } from "../react-variables";
import "../Auth/Auth";
import "./Profile.css";
import axios from "axios";
import SingleUserDiv from "../components/SingleUserDiv";
import MyLineGraph from "../components/MyLineGraph";

class StockProfile extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      profile: {},
      historyData: {},
      realHistoryData: {},
      error: false
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    history.push("/");
  };

  componentDidMount() {}

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
      console.log("user data from parent component: ", this.props.user);
    } else {
      this.setState({ profile: userProfile });
      console.log("user data from parent component: ", this.props.user);
    }

    const { getAccessToken } = this.props.auth;
    console.log(this.props.auth.getAccessToken);
    const headers = { Authorization: `Bearer ${getAccessToken()}` };
    console.log("testing this.props.user.symbol: ", this.props.user.symbol);

    // axios.get("http://localhost:3000/api/stocks/history/", { headers })
    axios
      .get(`${VARS_CONFIG.localhost}/api/stocks/history`, { headers })
      .then(response => this.setState({ historyData: response }))
      .catch(error => this.setState({ error: true }));

    //REAL AXIOS CALL FOR HISTORY/USER.SYMBOL
    // axios
    //   .get(`http://localhost:3000/api/stocks/history/${this.props.user.symbol}`, { headers })
    //   // axios.get(`${VARS_CONFIG.localhost}/api/history`, { headers })
    //   .then(response => this.setState({ realHistoryData: response }))
    //   .catch(error => this.setState({ error: true }));
  }

  render() {
    return (
      <div className="container">
        <Button onClick={this.handleSubmit} variant="primary">
          All users + stocks
        </Button>
        <Container>
          <Card>
            <Card.Header>
              <h2>{this.props.user.name}</h2>
            </Card.Header>
            {/* <Card.Img className="profile-thumbnail" variant="top" src={this.props.user.thumbnailFile} /> */}
            <Card.Body>
              <Card.Title>Symbol: {this.props.user.symbol}</Card.Title>
              <Card.Text>Price: {this.props.user.price}</Card.Text>
              <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
            </Card.Body>
          </Card>
        </Container>
        <Card>
          <Card.Title>FAKE HARDCODED HISTORY</Card.Title>
          <pre className="layout__item u-1/2-lap-and-up">
            {JSON.stringify(this.state.historyData, null, 2)}
          </pre>
        </Card>
        <Card>
          <Card.Title>REAL HISTORY</Card.Title>
          <pre className="layout__item u-1/2-lap-and-up">
            {JSON.stringify(this.state.realHistoryData, null, 2)}
          </pre>
        </Card>
        <Card>
          <Card.Title>Historical Data {this.props.user.symbol}</Card.Title>
          <MyLineGraph historyData={this.state.historyData} />
        </Card>
      </div>
    );
  }
}

export default withRouter(StockProfile);
