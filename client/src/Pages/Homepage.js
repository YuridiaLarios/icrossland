import React, { Component } from "react";
import logo from "../logo.svg";
import { Row } from "react-bootstrap";
import SingleStockDiv from "../components/SingleStockDiv";

class Homepage extends Component {
  constructor(props) {
    super(props); // props is an object that has users in it now
    this.state = {
      users: props.users,
      stocks: props.stocks
    };
  }

  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Welcome to icrossland, {this.props.name}</h1>
        <p>Do you want to see your dashboard?</p>
        {this.props.auth.isAuthenticated() && (
          <div>
            <a href="/secret">Click here</a>
            <div>
              {/* STOCKS DIVS */}
              <Row>
                {this.props.stocks.map(item => {
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
