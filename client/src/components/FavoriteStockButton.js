import React, { Component } from "react";
import { Button } from "react-bootstrap";

class FavoriteStockButton extends Component {
  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      stocks: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let stockSymbol = this.props.item.symbol;
    console.log("track button Clicked!" + this.props.item.symbol);
    this.props.getSymbolToTrack(stockSymbol);
  };

  render() {
    return (
      <Button variant="info" onClick={this.handleSubmit}>
        Track
      </Button>
    );
  }
}

export default FavoriteStockButton;
