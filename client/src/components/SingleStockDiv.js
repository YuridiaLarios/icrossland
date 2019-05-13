import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { VARS_CONFIG } from "../react-variables";
import StockProfileButton from "./StockProfileButton";
import FavoriteStockButton from "./FavoriteStockButton";
import axios from "axios";
import Auth from "../Auth/Auth";
import styled from "styled-components";

const Styles = styled.div``;

const auth = new Auth();

class SingleStockDiv extends Component {
  constructor(props) {
    super(props); // props ia an object that has item.id and item.name in it now
    this.state = {
      stock: {}
    };
  }

  // to handle deleting an event from database
  handleDeleteSearch = deletedUser => {
    const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };
    console.log("access token from singleStockUser = ", auth.getAccessToken());

    axios({
      method: "delete",
      url: `${VARS_CONFIG.localhost}/api/users/` + deletedUser._id,
      headers
    }).then(res => {
      this.props.deleteUser(res);
      console.log(res);
    });
  };

  render() {
    return (
      <Card id="stock-card" style={{ width: "18rem" }}>
        {/* <Card id="stock-card"> */}
        <Card.Body>
          <Card.Title>{this.props.item.name}</Card.Title>
          <Card.Text>
            <span className="stockSymbol">
              {this.props.item.symbol} <br />
            </span>
            {this.props.item.stock_exchange_long} <br /> <br />
            <span
              className={
                "stockDayChange " +
                (parseFloat(this.props.item.day_change) >= 0
                  ? "green-positive"
                  : "red-negative")
              }
            >
              {this.props.item.day_change}
            </span>
            <br /> <br />
            <span className="stockOpenPrice">
              {this.props.item.price_open} {this.props.item.currency}
            </span>
            <br />
            day_high: {this.props.item.day_high} <br /> <br />
            day_low: {this.props.item.day_low} <br /> <br />
            {/* 52_week_high: {this.props.item.52_week_high} <br /> <br /> */}
            {/* 52_week_low: {this.props.item.52_week_low} <br /> <br /> */}
            change_pct: {this.props.item.change_pct} <br /> <br />
            close_yesterday: {this.props.item.close_yesterday} <br /> <br />
            market_cap: {this.props.item.market_cap} <br /> <br />
            volume: {this.props.item.volume} <br /> <br />
            shares: {this.props.item.shares} <br /> <br />
            stock_exchange_short: {
              this.props.item.stock_exchange_short
            } <br /> <br />
            timezone: {this.props.item.timezone} <br /> <br />
            timezone_name: {this.props.item.timezone_name} <br /> <br />
            gmt_offset: {this.props.item.gmt_offset} <br /> <br />
            last_trade_time: {this.props.item.last_trade_time} <br /> <br />
          </Card.Text>
          <StockProfileButton
            item={this.props.item}
            getIndividualStockProfile={this.props.getIndividualStockProfile}
          />
          <FavoriteStockButton
            item={this.props.item}
            getSymbolToTrack={this.props.getSymbolToTrack}
          />
        </Card.Body>
      </Card>
    );
  }
}

export default SingleStockDiv;
