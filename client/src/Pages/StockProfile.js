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
      historyDates: [],
      historyOpenData: [],
      historyCloseData: [],
      realHistoryData: {},
      error: false
    };
  }

  organizedHistoryData = historyData => {
    let historyDates = Array.from(Object.keys(historyData.data));
    let historyOpenData = [];
    let historyCloseData = [];
    for (let i = 0; i < historyDates.length; i++) {
      historyOpenData.push(historyData.data[historyDates[i]].open);
      historyCloseData.push(historyData.data[historyDates[i]].close);
    }
    console.log(historyDates);
    console.log(historyOpenData);
    console.log(historyCloseData);

    this.setState({
      historyDates: historyDates,
      historyOpenData: historyOpenData,
      historyCloseData: historyCloseData
    });
  };

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

    // // FAKE AXIOS CALL FOR HISTORY/USER.SYMBOL
    // axios
    //   .get(`${VARS_CONFIG.localhost}/api/stocks/history`, { headers })
    //   .then(response => {
    //     this.setState({ historyData: response });
    //     this.organizedHistoryData(response);
    //   })
    //   .catch(error => this.setState({ error: true }));

    // REAL AXIOS CALL FOR HISTORY/USER.SYMBOL
    axios
      .get(
        `${VARS_CONFIG.localhost}/api/stocks/history/${this.props.user.symbol}`,
        { headers }
      )
      .then(response => {
        this.setState({ realHistoryData: response });
        this.organizedHistoryData(response);
      })
      .catch(error => this.setState({ error: true }));
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
          <MyLineGraph
            historyDates={this.state.historyDates}
            historyOpenData={this.state.historyOpenData}
            historyCloseData={this.state.historyCloseData}
          />
        </Card>
      </div>
    );
  }
}

export default withRouter(StockProfile);
