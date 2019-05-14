import React, { Component } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { VARS_CONFIG } from "../react-variables";
import "../Auth/Auth";
import "./Profile.css";
import axios from "axios";
import Styles from "./Pages-Styles/StockProfileStyles";
import MyLineGraph from "../components/MyLineGraph";

class StockProfile extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      stock: props.stock,
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

  componentWillMount() {
    function isEmpty(obj) {
      for (var key in obj) {
        if (obj.hasOwnProperty(key)) return false;
      }
      return true;
    }

    const { getAccessToken } = this.props.auth;
    // console.log(this.props.auth.getAccessToken);
    const headers = { Authorization: `Bearer ${getAccessToken()}` };

    if (isEmpty(this.props.stock)) {
      console.log("no props, fetch needed");
      axios
        .get(
          `${VARS_CONFIG.localhost}/api/stocks/${
            this.props.match.params.stockId
          }`,
          { headers }
        )
        .then(response => {
          this.setState({ stock: response.data });
        })
        .catch(error => this.setState({ error: true }));

      // FAKE AXIOS CALL FOR HISTORY/USER.SYMBOL
      axios
        .get(`${VARS_CONFIG.localhost}/api/stocks/history`, { headers })
        .then(response => {
          this.setState({ historyData: response });
          this.organizedHistoryData(response);
        })
        .catch(error => this.setState({ error: true }));
    } else {
      console.log("props were passed!");

      //REAL AXIOS CALL FOR HISTORY/USER.SYMBOL
      axios
        .get(
          `${VARS_CONFIG.localhost}/api/stocks/history/${
            this.props.match.params.stockId
          }`,
          { headers }
        )
        .then(response => {
          this.setState({ historyData: response });
          this.organizedHistoryData(response);
        })
        .catch(error => this.setState({ error: true }));
    }
  }

  render() {
    return (
      <Styles>
        <div className="STOCKPROFILE-body">
          <h1>{this.state.stock.name}</h1>
          <Container>
            <Row className="STOCKPROFILE-row">
              <Col sm={4}>
                <Card>
                  <Card.Header>
                    <h2>{this.state.stock.name}</h2>
                  </Card.Header>

                  <Card.Body>
                    <Card.Title>Symbol: {this.state.stock.symbol}</Card.Title>
                    <Card.Text>Price: {this.state.stock.price}</Card.Text>
                    <pre>{JSON.stringify(this.state.stock, null, 2)}</pre>
                  </Card.Body>
                </Card>
              </Col>
              <Col sm={8}>
                <MyLineGraph
                  historyDates={this.state.historyDates}
                  historyOpenData={this.state.historyOpenData}
                  historyCloseData={this.state.historyCloseData}
                />
              </Col>
            </Row>
          </Container>
          <Card>
            <Card.Title>HISTORY DATA</Card.Title>
            <pre className="layout__item u-1/2-lap-and-up">
              {JSON.stringify(this.state.historyData, null, 2)}
            </pre>
          </Card>
          <Card>
            <Card.Title>Historical Data {this.state.stock.symbol}</Card.Title>
          </Card>
        </div>
      </Styles>
    );
  }
}

export default withRouter(StockProfile);
