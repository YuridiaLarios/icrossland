import styled from "styled-components";

const Styles = styled.div`
  .HOMEPAGE-body {
    width: 100%;
    background-color: white;
  }
  header {
    // height: height: 50vh;
    background-image: linear-gradient(
      rgb(41, 128, 185),
      rgb(109, 213, 250),
      rgb(255, 255, 255)
    );
    margin-bottom: 200px;
  }

  .header-shaping-img {
    height: 20vmin;
    width: 100%;
    pointer-events: none;
  }

  .h1-main-header {
    color: #fff;
    text-transform: uppercase;
    margin: 0px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    // line-height: 1.7;
    color: #eee;
    display: block;
    font-size: 40px;
    letter-spacing: 5px;
  }

  h1 {
    padding: 100px 0;
    text-align: center;
    color: white;
  }

  .card {
    position: absolute;
    display: inline;
    width: 35%;
    left: 0;
    right: 0;
    margin: auto
    box-shadow: 5px 10px 20px 1px rgb(0, 0, 0, 0.253);
    border-radius: 20px;
    opacity: 0.9;
    filter: alpha(opacity=60); /* For IE8 and earlier */
  }

  h2 {
    font-family: "initial";
  }

  .btn:link,
  .btn:visited {
    text-transform: uppercase;
    text-decoration: none;
    padding: 10px 50px;
    display: inline-block;
    border-radius: 100px;
    transition: all 0.2s;
  }

  .btn:hover {
    opacity: 0.8;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .btn:active {
    transform: translateY(-1px);
    box-shadow: 0 5px 40px rgba(0, 0, 0, 0.2);
  }

  .btn-blue {
    background-color: rgb(41, 128, 185);
    color: white;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1.5px;
    margin: 10px;
  }
`;

export default Styles;
