import React, { Component } from "react";
import logo from "../logo.svg";
import { Row } from "react-bootstrap";
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
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to icrossland, {this.props.name}</h1>
        <p>Do you want to see your dashboard?</p>
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
        {!this.props.auth.isAuthenticated() && (
          <div>
            <hr />
            Please login first
            <hr />
            <button onClick={this.props.auth.login}>login</button>
          </div>
        )}
      </div>
    );
  }
}

export default Homepage;
