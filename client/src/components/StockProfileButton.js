import React, { Component } from 'react';
import {Button} from "react-bootstrap";
import { withRouter } from 'react-router-dom';



class StockProfileButton extends Component {

  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      stocks: {}
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { history } = this.props;
    let profileStockValues = this.props.item;
    history.push(`/stockProfile/${this.props.item.symbol}`);
    this.props.getIndividualStockProfile(profileStockValues);
  };

  render() {
    return (
      <Button variant="primary" onClick={this.handleSubmit} >Stock Profile</Button>
    );
  }
}
  


export default withRouter(StockProfileButton);