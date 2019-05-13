import styled from "styled-components";

const Styles = styled.div`
  .USERS-body {
    margin-top: 0px;
    background: radial-gradient(#e5e5e5, #ffff, #e5e5e5);
    // background: green;
    padding: 50px;
    padding-top: 50px;
  }

  h1 {
    font-family: "initial";
  }
  .usersContainer {
    // background-color: red;
    width: 85%;
    margin: 0 auto;
    padding: 60px;
    text-align: center;
    font-family: "initial";
    font-size: 1.1em;
  }

  #individualUserCard {
    margin: 20px auto;
    white-space: auto;
    background-color: white;
  }

  .card-username {
    font-weight: bold;
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
`;
export default Styles;
