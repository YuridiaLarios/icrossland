import React, { Component } from "react";
import logo2 from "../globe-308800.svg";
import logo4 from "../header.svg";

import styled from "styled-components";
import { Card, Container, Row } from "react-bootstrap";
import SingleStockDiv from "../components/SingleStockDiv";

const Styles = styled.div`
  .HOMEPAGE-body {
    width: 100%;
    background-color: white;
  }
  header {
    height: height: 100vh;
    background-image: linear-gradient(
      rgb(41, 128, 185),
      rgb(109, 213, 250),
      rgb(255, 255, 255)
    );
    margin-bottom: 200px;
  }

  .header-shaping-img {
    height: 41vmin;
    width: 100%;
    pointer-events: none;
  }

  .h1-main-header {
    color: #fff;
    text-transform: uppercase;
    margin: 0px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    line-height: 1.7;
    color: #eee;
    display: block;
    font-size: 40px;
    letter-spacing: 5px;
  }

  h1 {
    padding: 100px 0;
    text-align: center;
    color: white;
  }

  .card {
    position: absolute;
    display: inline;
    width: 35%;
    left: 0;
    right: 0;
    margin: auto
    box-shadow: 5px 10px 20px 1px rgb(0, 0, 0, 0.253);
    border-radius: 20px;
  }

  h2 {
    font-family: "initial";
  }

  .btn:link,
  .btn:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px 50px;
    display: inline-block;
    border-radius: 100px;
    transition: all 0.2s;
  }

  .btn:hover {
    opacity: 0.7;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .btn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
  }

  .btn-blue {
    background-color: rgb(41, 128, 185);
    color: white;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1.5px;
    margin: 10px;
  }
`;

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
