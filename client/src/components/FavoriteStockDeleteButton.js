import React, { Component } from "react";
import { Button } from "react-bootstrap";
// import { withRouter } from 'react-router-dom';

class FavoriteStockDeleteButton extends Component {
  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      stocks: {}
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    let stockSymbol = this.props.item.symbol;
    console.log("untrack button Clicked!" + this.props.item.symbol);

    this.props.deleteSymbolToTrack(stockSymbol);
  };

  render() {
    return (
      <Button variant="danger" onClick={this.handleSubmit}>
        Untrack
      </Button>
    );
  }
}

export default FavoriteStockDeleteButton;
