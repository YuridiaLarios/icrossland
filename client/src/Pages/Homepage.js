import React, { Component } from "react";
import logo2 from "../globe-308800.svg";
import logo4 from "../header.svg";
import Styles from "./Pages-Styles/HomepageStyles";
import { Card, Container, Row } from "react-bootstrap";
import SingleStockDiv from "../components/SingleStockDiv";

class Homepage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.setState({
      searchString: this.refs.search.value
    });
  }

  render() {
    let _stocks = this.props.stocks;
    let search = this.state.searchString.trim().toLowerCase();

    if (search.length > 0) {
      _stocks = _stocks.filter(function(stock) {
        return stock.name.toLowerCase().match(search);
      });
    }
    return (
      <Styles>
        <Container className="HOMEPAGE-body">
          {!this.props.auth.isAuthenticated() && (
            <header>
              <h1 className="h1-main-header">Welcome to icrossland</h1>
              <Card className="text-center">
                <Card.Body>
                  <img src={logo2} className="App-logo" alt="logo2" />

                  <h2>Please login first</h2>
                  <a
                    href="#"
                    onClick={this.props.auth.login}
                    className="btn btn-blue btn-animated"
                  >
                    LOGIN
                  </a>
                  <div className="graph-container" />
                </Card.Body>
              </Card>
              <img src={logo4} className="header-shaping-img" alt="logo4" />
            </header>
          )}

          {this.props.auth.isAuthenticated() && (
            <div>
              <a href="/dashboard">Click here</a>
              <div>
                <input
                  type="text"
                  value={this.state.searchString}
                  ref="search"
                  onChange={this.handleChange}
                  placeholder="type name here"
                />
                {/* STOCKS DIVS */}
                <Row>
                  {_stocks.map(item => {
                    return (
                      <SingleStockDiv
                        key={item.symbol}
                        item={item}
                        getIndividualStockProfile={
                          this.props.getIndividualStockProfile
                        }
                        getSymbolToTrack={this.props.getSymbolToTrack}
                        addUser={this.props.addUser}
                        deleteUser={this.props.deleteUser}
                      />
                    );
                  })}
                </Row>
              </div>
            </div>
          )}
        </Container>
      </Styles>
    );
  }
}

export default Homepage;
