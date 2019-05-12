import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Auth from "./Auth/Auth";
import { VARS_CONFIG } from "./react-variables";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { Layout } from "./components/Layout";
import Homepage from "./Pages/Homepage";
import Dashboard from "./Pages/Dashboard";
import Users from "./Pages/Users";
import UserProfile from "./Pages/UserProfile";
import StockProfile from "./Pages/StockProfile";
import NotFound from "./Pages/NotFound";
import Callback from "./components/Callback";

const auth = new Auth();
let users2 = [
  {
    name: "Leonard Rogers",
    email: "egestas@justonecante.org"
  },
  {
    name: "Walker Pace",
    email: "erat.eget.tincidunt@idsapienCras.org"
  },
  {
    name: "Lance Mcintyre",
    email: "Nam.ligula@quamvel.net"
  },
  {
    name: "Rudyard Conway",
    email: "sit@nunc.org"
  },
  {
    name: "Chadwick Oneal",
    email: "laoreet@dictum.edu"
  },
  {
    name: "Isaiah Kent",
    email: "diam.dictum@lobortisquam.co.uk"
  },
  {
    name: "Griffith Perkins",
    email: "congue@acfermentumvel.ca"
  },
  {
    name: "Lawrence Wheeler",
    email: "ac.libero@Duisac.org"
  },
  {
    name: "Preston Walker",
    email: "egestas.rhoncus@eudui.co.uk"
  },
  {
    name: "Simon Brewer",
    email: "nunc.sed@Fuscediamnunc.co.uk"
  }
];

class App extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      fakeusers: [],
      users: [],
      stocks: [],
      favoriteStocks: ["Empty Start Tracking Stocks"],
      individualUserProfile: {},
      individualStockProfile: {}
    };
  }

  // function to get the info of an individual user profile
  // binds this method to getIndividualUserProfile instance
  getIndividualUserProfile = currentUser => {
    this.setState({
      individualUserProfile: currentUser
    });
  };

  // function to get the info of an individual stock profile
  // binds this method to getIndividualStockProfile instance
  getIndividualStockProfile = currentStock => {
    this.setState({
      individualStockProfile: currentStock
    });
  };

  updateSymbolsInDatabase() {
    let symbols = this.state.favoriteStocks;
    console.log("Symbols updated:", symbols);

    axios({
      method: "put",
      url: `${VARS_CONFIG.localhost}/api/stockFav`,
      headers: {
        accept: "application/json"
      },
      data: symbols
    }).then(res => {
      console.log(`the response is: ${res}`);
    });
  }

  getSymbolToTrack = currentSymbol => {
    let updatedSymbols = Array.from(this.state.favoriteStocks);
    updatedSymbols.push(currentSymbol);
    this.setState(
      {
        favoriteStocks: updatedSymbols
      },
      this.updateSymbolsInDatabase
    );
  };

  // ADDING USER TO UI
  // binds this method to App.js instance
  addUser = newUser => {
    // CREATING A NEW INSTANCE SO REACT CAN COMPARE OLD STATES TO NEW STATES
    let updatedUsers = Array.from(this.state.users);
    updatedUsers.push(newUser);
    this.setState({
      // takes an object and merges that object into the current state
      users: updatedUsers
    });
  };

  // DELETING USER FROM UI
  //binds this method to App.js instance
  deleteUser = deletedUser => {
    // CREATING A NEW INSTANCE SO REACT CAN COMPARE OLD STATES TO NEW STATES
    let updatedUsers = Array.from(this.state.users);
    let oldUser = this.state.users.findIndex(function(element) {
      return deletedUser._id === element._id;
    });
    updatedUsers.splice(oldUser, 1);
    this.setState({
      // takes an object and merges that object into the current state
      users: updatedUsers
    });
  };

  componentWillMount() {
    let profile = auth.getProfile();
    const { getAccessToken } = this.props.auth;
    // console.log("accessToken from App.js = ", getAccessToken());
    // console.log("Auth 0 id from app.js = ", profile.sub);
    const headers = { Authorization: `Bearer ${auth.getAccessToken()}` };

    // FAKE USERS UI
    this.setState({ fakeusers: users2 });

    //MAIN ALL USERS UI
    axios
      .get(`${VARS_CONFIG.localhost}/api/users`, { headers })
      .then(response => this.setState({ users: response.data }))
      .catch(error => this.setState({ error: true }));

    //MAIN ALL STOCKS UI
    axios
      .get(`${VARS_CONFIG.localhost}/api/stocks`, {
        params: {
          data:
            "HSBA.L,MSFT,AAPL,F,CVS,ENB,ANTM,EXFO,FDX,W,UBER,LYFT,GOOGL,CVX,CBS,BXP,FB,AMZN,ET,DELL,CMCSA,TSLA,DATA,TEVA"
        },
        headers
      })
      .then(response => this.setState({ stocks: response.data }))
      .catch(error => this.setState({ error: true }));

    //MAIN ALL SYMBOLS FOR CURRENT USER
    axios
      .get(`${VARS_CONFIG.localhost}/api/myFavoriteStocks`, {
        params: profile.sub,
        headers
      })
      .then(response => {
        console.log("the back kitty response: ", response.data.favoriteStocks);
        this.setState({ favoriteStocks: response.data.favoriteStocks });
      })
      .catch(error => this.setState({ error: true }));
  }

  render() {
    return (
      <div className="App">
        <header>
          <BrowserRouter>
            <NavigationBar {...this.props} />
            <Layout>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Homepage
                      fakeusers={this.state.fakeusers}
                      users={this.state.users}
                      stocks={this.state.stocks}
                      {...this.props}
                      getIndividualUserProfile={this.getIndividualUserProfile}
                      getIndividualStockProfile={this.getIndividualStockProfile}
                      getSymbolToTrack={this.getSymbolToTrack}
                      addUser={this.addUser}
                      deleteUser={this.deleteUser}
                    />
                  )}
                />

                <Route path="/callback" render={props => <Callback />} />

                <Route
                  path="/Dashboard"
                  render={props =>
                    this.props.auth.isAuthenticated() ? (
                      <Dashboard
                        users={this.state.users}
                        {...this.props}
                        getIndividualUserProfile={
                          this.props.getIndividualUserProfile
                        }
                        getIndividualStockProfile={
                          this.getIndividualStockProfile
                        }
                        addUser={this.addUser}
                      />
                    ) : (
                      <Redirect to={{ pathname: "/" }} />
                    )
                  }
                />

                <Route
                  path="/users"
                  render={props =>
                    this.props.auth.isAuthenticated() ? (
                      <Users
                        {...this.props}
                        users={this.state.users}
                        getIndividualUserProfile={this.getIndividualUserProfile}
                        deleteUser={this.deleteUser}
                        getIndividualStockProfile={
                          this.getIndividualStockProfile
                        }
                        getSymbolToTrack={this.getSymbolToTrack}
                      />
                    ) : (
                      <Redirect to={{ pathname: "/" }} />
                    )
                  }
                />

                <Route
                  path="/userProfile/:userId"
                  render={props =>
                    this.props.auth.isAuthenticated() ? (
                      <UserProfile
                        {...this.props}
                        user={this.state.individualUserProfile}
                      />
                    ) : (
                      <Homepage {...this.props} />
                    )
                  }
                />

                <Route
                  path="/stockProfile/:stockId"
                  render={props =>
                    this.props.auth.isAuthenticated() ? (
                      <StockProfile
                        {...this.props}
                        stock={this.state.individualStockProfile}
                      />
                    ) : (
                      <Homepage {...this.props} />
                    )
                  }
                />

                <Route
                  path="/logout"
                  render={props =>
                    this.props.auth.isAuthenticated() ? (
                      <Homepage {...this.props} />
                    ) : (
                      <Homepage {...this.props} />
                    )
                  }
                />

                <Route component={NotFound} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </header>

        {/* {mainComponent} */}
      </div>
    );
  }
}

export default App;
