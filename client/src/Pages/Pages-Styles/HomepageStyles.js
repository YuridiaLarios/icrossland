import styled from "styled-components";

const Styles = styled.div`

/****************************************
  BLUE BUTTON STYLES
****************************************/
.btn {
  margin-right: 10px;
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

/****************************************
  SEARCHBAR STYLES
****************************************/


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
  margin: 10px;

}

input[type="text"]:focus {
  box-shadow: 0 0 3pt 2pt #007bff;
  width: 15rem;
}

.searchbar:hover {
  width: 15rem;
}


/****************************************
  LOGIN STYLES
****************************************/

  .LOGIN-header {
    // height: height: 50vh;
    background-image: linear-gradient(
      rgb(41, 128, 185),
      rgb(109, 213, 250),
      rgb(255, 255, 255)
    );
    margin-bottom: 200px;
  }

  .LOGIN-header-shaping-img {
    height: 35vmin;
    width: 100%;
    pointer-events: none;
  }

  .LOGIN-h1-main-header {
    color: #fff;
    text-transform: uppercase;
    margin: 0px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    color: #eee;
    display: block;
    font-size: 40px;
    letter-spacing: 5px;
    padding: 80px 0;

  }

  #LOGIN-welcome-card {
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

  .LOGIN-h2 {
    font-family: "initial";
  }

/****************************************
  HOMEPAGE STYLES
****************************************/

  .HOMEPAGE-body {
    width: 100%;
    background: rgba(229, 229, 229, 0.3);
    background: radial-gradient(#e5e5e5, #ffff, #e5e5e5);
  }

  h1 {
    font-family: "initial";
    padding-top: 50px;
  }

  .row-card-stocks {
    margin: 20px auto;
    text-align: center;
    padding: 50px;
    align-items: center;
    justify-content: center;
  }

  #stock-card {
    margin: 10px auto;
    width: 22rem;
    height: 43rem;
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

  @media only screen and (max-width: 515px) {
    .row-card-stocks {
      padding: 0px;
    }
  
    #stock-card {
      margin: 10px auto;
      width: 20rem;
      height: 43rem;
    }
  }

  @media only screen and (max-width: 350px) { 
    #stock-card {
      width: 18rem;
      height: 43rem;
    }
  }
`;

export default Styles;
