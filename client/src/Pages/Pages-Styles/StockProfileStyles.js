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

  #stock-card {
    width: 28rem;
    height: 63rem;
  }

  .individual-stock-card {
    margin: 10px;
  }

  .col {
    display: flex;
    justify-content: center;
    text-align: center;
    margin-top: 50px;
  }
  .stock-basic-info {
    background-color: white;
    box-shadow: 5px 10px 20px 1px rgb(0, 0, 0, 0.253);
    border-radius: 20px;
    width: 80%;
    margin: 0 auto;
    padding: 30px;
    padding-top: 60px;
    font-size: 1.4em;
    text-align: center;
    font-family: initial;
  }

  .stockSymbol {
    font-weight: bold;
  }

  .stockDayChange {
    text-align: center;
    margin: 0 auto;
    width: 50%;
    font-size: 32px;
    padding: 10px 1px;
    font-weight: bold;
  }

  .green-positive {
    color: #008000;
    border: solid 2px #008000;
    border-radius: 20px;
  }

  .red-negative {
    color: #ff0000;
    border: solid 2px #ff0000;
    border-radius: 20px;
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

  .table-container {
    width: 80%;
    background-color: white;
    box-shadow: 5px 10px 20px 1px rgb(0, 0, 0, 0.253);
    border-radius: 20px;
    margin: 0 auto;
    text-align: center;
  }

  .table {
    border-radius: 20px;
  }

  .graph-container {
    font-family: initial;
    margin-top: 50px;
  }

  .LineGraph_graphContainer__wos8X {
    margin-top: 50px;
    width: 65vw;
    box-shadow: 5px 10px 20px 1px rgb(0, 0, 0, 0.253);
  }
  @media only screen and (max-width: 1200px) {
    .STOCKPROFILE-body {
      background: pink;
    }
    .row {
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0px;
    }
    .col-lg-4 {
      max-width: 80%;
    }

    .col-lg-8 {
      max-width: 80%;
    }
    #stock-card {
      background-color: green;
      width: 28rem;
      height: 100rem;
    }
  }
`;

export default Styles;
