import styled from "styled-components";

const Styles = styled.div`
  .DASHBOARD-body {
    margin-top: 0px;
    background: rgba(229, 229, 229, 0.3);
    background: radial-gradient(#e5e5e5, #ffff, #e5e5e5);
    padding: 50px;
    padding-top: 50px;
  }
  h1 {
    font-family: "initial";
  }

  .btn {
    margin: 10px;
  }

  .btn:link,
  .btn:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 12px 20px;
    display: inline-block;
    border-radius: 100px;
    transition: all 0.2s;
    margin: 20px;
  }

  .btn:hover {
    opacity: 0.7;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgb(105, 105, 105);
  }

  .btn:active {
    transform: translateY(-1px);
    box-shadow: 0 25px 40px rgba(0, 0, 0, 0.2);
  }

  .btn-blue {
    background-color: rgb(41, 128, 185);
    color: white;
  }

  #user-card {
    margin-bottom: 45px;
    margin-top: 0px;
    box-shadow: 0px 0px 10px -8px rgba(0, 0, 0, 1);
    border-radius: 15px 50px;
    width: 500px;
    display: flex;
    font-family: "initial";
    z-index: 2;
    height: 100%;
  }

  #user-card-header {
    text-transform: uppercase;
    border-radius: 10px 50px 0px 0px;
    padding: 20px;
  }

  .profile-thumbnail {
    margin: 0 auto;
    margin-top: 40px;
    margin-bottom: 30px;
    width: 200px;
    border-radius: 50%;
  }

  .user-info {
    font-weight: bold;
    font-size: 16px;
    color: #696969;
    margin-top: 0px;
    margin-bottom: 30px;
    padding: 10px;
  }

  .searchbar {
    font-size: 1rem;
    text-align: center;
    border: none;
    outline: none;
    border-radius: 10rem;
    box-shadow: 0px 0px 10px -8px rgba(0, 0, 0, 1);
    padding: 10px;
    transition: all 0.2s;
    transition-delay: 0.1s;
  }

  input[type="text"]:focus {
    box-shadow: 0 0 3pt 2pt #007bff;
    width: 15rem;
  }

  .searchbar:hover {
    width: 15rem;
  }

  .favStock-card-list {
    display: inline-block;
    margin-left: 40px;
    white-space: nowrap;
  }

  #stock-card {
    // background-color: red;
    display: inline-block;
    margin: 10px;
    white-space: auto;
  }

  #stock-card {
    @media (min-width: 768px) {
      width: 80%;
      white-space: nowrap;
      margin-top: 0;
    }
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

  @media only screen and (max-width: 1100px) {
    .DASHBOARD-body {
      background: blue;
      margin: 0 auto;
      padding: 50px;
    }

    #user-card {
      margin-bottom: 0px;
      width: 500px;
      display: block;
      z-index: auto;
      height: auto;
    }

    .user-info {
      font-weight: bold;
      font-size: 16px;
      color: #696969;
      margin-top: 0px;
      margin-bottom: 30px;
      padding: 10px;
    }

    .favStock-card-list {
      display: block;
      white-space: wrap;
    }

    #stock-card {
      display: block;
      margin: 0px;
      white-space: auto;
    }

    #stock-card {
      @media (min-width: 768px) {
        width: 80%;
        white-space: nowrap;
        margin-top: 0;
      }
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
  }
`;

export default Styles;
