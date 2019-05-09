import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { VARS_CONFIG } from './react-variables';
import UserProfileButton from "./UserProfileButton";
import StockProfileButton from "./StockProfileButton";
import UserDeleteButton from "./UserDeleteButton";
import axios from "axios";
import Auth from "../Auth/Auth";

const auth = new Auth();

class SingleStockDiv extends Component {
  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      stotck: {}
    };
  }

  // to handle deleting an event from database
  handleDeleteSearch = deletedUser => {
    const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };
    console.log(auth.getAccessToken());

    axios({
      method: "delete",
      // url: "http://localhost:3000/api/users/" + deletedUser._id,
      url: `${VARS_CONFIG.localhost}/api/users/` + deletedUser._id,
      headers
    }).then(res => {
      this.props.deleteUser(res);
      console.log(res);
    });
  };

  render() {
    return (
      <div className="col s12 m12 l4">
        <Card style={{ width: "18rem" }}>
          <Card.Img variant="top" src={this.props.item.thumbnailFile} />
          <Card.Body>
            <Card.Title>{this.props.item.name}</Card.Title>
            <Card.Text>
              Symbol: {this.props.item.symbol} <br />
              Currency: {this.props.item.currency} <br />
              price_open: {this.props.item.price_open} <br /> <br />
              day_high: {this.props.item.day_high} <br /> <br />
              day_low: {this.props.item.day_low} <br /> <br />
              {/* 52_week_high: {this.props.item.52_week_high} <br /> <br /> */}
              {/* 52_week_low: {this.props.item.52_week_low} <br /> <br /> */}
              day_change: {this.props.item.day_change} <br /> <br />
              change_pct: {this.props.item.change_pct} <br /> <br />
              close_yesterday: {this.props.item.close_yesterday} <br /> <br />
              market_cap: {this.props.item.market_cap} <br /> <br />
              volume: {this.props.item.volume} <br /> <br />
              shares: {this.props.item.shares} <br /> <br />
              stock_exchange_long: {this.props.item.stock_exchange_long} <br /> <br />
              stock_exchange_short: {this.props.item.stock_exchange_short} <br /> <br />
              timezone: {this.props.item.timezone} <br /> <br />
              timezone_name: {this.props.item.timezone_name} <br /> <br />
              gmt_offset: {this.props.item.gmt_offset} <br /> <br />
              last_trade_time: {this.props.item.last_trade_time} <br /> <br />

            </Card.Text>
            <StockProfileButton
              item={this.props.item}
              getIndividualUserProfile={this.props.getIndividualUserProfile}
              getIndividualStockProfile={this.props.getIndividualStockProfile}
            />
            <UserDeleteButton
              item={this.props.item}
              handleDeleteSearch={this.handleDeleteSearch}
            />
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default SingleStockDiv;
