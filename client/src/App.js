import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { VARS_CONFIG } from './react-variables';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { Layout } from "./components/Layout";
import Homepage from "./Pages/Homepage";
import Secret from "./Pages/Secret";
import Profile from "./Pages/Profile";
import UserProfile from "./Pages/UserProfile";
import StockProfile from "./Pages/StockProfile";
import NotFound from "./Pages/NotFound";
import Callback from "./components/Callback";

class App extends Component {
  // CONSTRUCTOR
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      stocks: [],
      individualUserProfile: {},
      individualStockProfile: {}
    };
  }

  // function to get the info of an individual user profile
  // binds this method to getIndividualUserProfile instance
  getIndividualUserProfile = currentUser => {
    console.log(
      "the name is: " + currentUser.username + " the id is: " + currentUser._id
    );
    this.setState({
      individualUserProfile: currentUser
    });
    console.log(
      "the name from state is: " +
        this.state.individualUserProfile.username +
        "the id from state is: " +
        this.state.individualUserProfile._id
    );
  };

  // function to get the info of an individual stock profile
  // binds this method to getIndividualStockProfile instance
  getIndividualStockProfile = currentStock => {
    console.log(
      "the name before state is: " +
        currentStock.name +
        " the symbol before state is: " +
        currentStock.symbol
    );
    this.setState({
      individualStockProfile: currentStock
    });
    console.log(
      "the name from app.js state is: " +
        this.state.individualStockProfile.name +
        "the symbol from app.js state is: " +
        this.state.individualStockProfile.symbol
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

  //MAIN ALL USERS UI
  // moving it here makes it accessible to all children components
  componentDidMount() {
    const { getAccessToken } = this.props.auth;
    console.log(this.props.auth.getAccessToken);
    const headers = { Authorization: `Bearer ${getAccessToken()}` };

    // axios.get("http://localhost:3000/api/users", { headers })
      axios.get(`${VARS_CONFIG.localhost}/api/users`, { headers })
      .then(response => this.setState({ users: response.data }))
      .catch(error => this.setState({ error: true }));

    // axios.get("http://localhost:3000/api/stocks", { headers })
      axios.get(`${VARS_CONFIG.localhost}/api/stocks`, { headers })
      .then(response => this.setState({ stocks: response.data }))
      .catch(error => this.setState({ error: true }));
  }

  render() {
    let mainComponent = "";
    switch (this.props.location) {
      case "callback":
        mainComponent = <Callback />;
        break;
    }

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
                      users={this.state.users}
                      stocks={this.state.stocks}
                      {...this.props}
                      getIndividualUserProfile={this.getIndividualUserProfile}
                      getIndividualStockProfile={this.getIndividualStockProfile}
                      addUser={this.addUser}
                      deleteUser={this.deleteUser}
                    />
                  )}
                />

                <Route
                  path="/secret"
                  render={props =>
                    this.props.auth.isAuthenticated() ? (
                      <Secret
                        users={this.state.users}
                        {...this.props}
                        getIndividualUserProfile={
                          this.props.getIndividualUserProfile
                        }
                        addUser={this.addUser}
                      />
                    ) : (
                      <Redirect to={{ pathname: "/" }} />
                    )
                  }
                />

                <Route
                  path="/profile"
                  render={props =>
                    this.props.auth.isAuthenticated() ? (
                      <Profile {...this.props} />
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
                        user={this.state.individualUserProfile}
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

        {mainComponent}
      </div>
    );
  }
}

export default App;
