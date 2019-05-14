import styled from "styled-components";
const Styles = styled.div`
  .STOCKPROFILE-body {
    background: rgba(229, 229, 229, 0.3);
    background: radial-gradient(#e5e5e5, #ffff, #e5e5e5);
    padding: 50px;
    padding-top: 50px;
  }

  .STOCKPROFILE-row {
    width: 90%;
    margin: 50px auto;
    text-align: center;
    padding: 50px;
  }

  h1 {
    font-family: "initial";
  }

  .individual-stock-card {
    margin: 10px;
  }

  .card-body {
    white-space: normal;
    font-family: "initial";
    font-size: 1.15em;
  }

  .stockSymbol {
    font-weight: bold;
  }

  .stockDayChange {
    font-size: 32px;
    padding: 10px 1px;
    font-weight: bold;
    margin-bottom: 0px;
  }

  .green-positive {
    color: #008000;
    border: solid 2px #008000;
    border-radius: 20px;
    margin: 0px;
  }

  .red-negative {
    color: #ff0000;
    border: solid 2px #ff0000;
    border-radius: 20px;
    margin: 0px;
  }
  .small-text {
    display: block;
    margin-left: 18px;
    font-size: 18px;
  }

  .stockOpenPrice {
    font-size: 22px;
    font-weight: bold;
  }
`;

export default Styles;
