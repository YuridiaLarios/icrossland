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
  };

  render() {
    return (
      <Button variant="primary" onClick={this.handleSubmit}>
        Track
      </Button>
    );
  }
}

export default FavoriteStockButton;
