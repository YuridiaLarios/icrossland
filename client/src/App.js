import React, { Component } from 'react';
// import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {NavigationBar} from './components/NavigationBar';
import {Jumbotron} from './components/Jumbotron';
import {Layout} from './components/Layout';
import { Homepage } from './Homepage';
import { Login } from './Login';
import  Logout  from './Logout';
import { Profile } from './Profile';
// import { NoMatch } from './NoMatch';

/*************************************************
 MAIN PARENT COMPONENT
**************************************************/
class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      userInformation: {},
      error: false         
    }
  }



  //MAIN USERINFO UI
  // moving it here makes it accessible to all children components
  componentDidMount() {
    const url = `/auth/userinfo`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.setState({
          userInformation: data
        })
      })
      .catch((error) => {
        this.setState({
          error: true
        })
      });
  }

  render() {
    return (
      <React.Fragment>
        <Router>
          <NavigationBar />
          <Jumbotron />
          <Layout>
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route path='/privacy-policy' component={() => { window.location = '/auth/logoutme'; return null;} }/>
              <Route path="/profile" component={Profile} />
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
    )
  }

}

export default App;
