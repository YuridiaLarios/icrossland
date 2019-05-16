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
  }

  handleChange = () => {
    this.setState({
      searchString: this.refs.search.value
    });
  };

  render() {
    let hrefLink = "#";
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
            <header className="LOGIN-header">
              <h1 className="LOGIN-h1-main-header">Welcome to icrossland</h1>
              <Card id="LOGIN-welcome-card" className="text-center tranparency">
                <Card.Body>
                  <img src={logo2} className="App-logo" alt="logo2" />

                  <h2 className="LOGIN-h2">Please login first</h2>
                  <a
                    href={hrefLink}
                    onClick={this.props.auth.login}
                    className="btn btn-blue btn-animated"
                  >
                    LOGIN
                  </a>
                </Card.Body>
              </Card>
              <img
                src={logo4}
                className="LOGIN-header-shaping-img"
                alt="Header blue spiky figure"
              />
            </header>
          )}

          {this.props.auth.isAuthenticated() && (
            <div>
              <h1>Explore Stocks </h1>
              <input
                className="searchbar"
                type="text"
                value={this.state.searchString}
                ref="search"
                onChange={this.handleChange}
                placeholder="Filter by Name"
              />
              {/* STOCKS CARDS */}

              <Row className="row-card-stocks">
                {_stocks.map(item => {
                  return (
                    <div
                      key={item.symbol}
                      className="col s12 m12 l4 individual-stock-card"
                    >
                      <SingleStockDiv
                        key={item.symbol}
                        item={item}
                        favoriteStocks={this.props.favoriteStocks}
                        getIndividualStockProfile={
                          this.props.getIndividualStockProfile
                        }
                        getSymbolToTrack={this.props.getSymbolToTrack}
                        deleteSymbolToTrack={this.props.deleteSymbolToTrack}
                      />
                    </div>
                  );
                })}
              </Row>
            </div>
          )}
        </Container>
      </Styles>
    );
  }
}

export default Homepage;
