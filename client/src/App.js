import React from 'react';
// import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {NavigationBar} from './components/NavigationBar';
import {Jumbotron} from './components/Jumbotron';
import {Layout} from './components/Layout';
import { Homepage } from './Homepage';
import { Login } from './Login';
import { Logout } from './Logout';
import { Profile } from './Profile';
import { NoMatch } from './NoMatch';


function App() {
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
              <Route path="/profile" component={Profile} />
              {/* <Route component={NoMatch} /> */}
            </Switch>
          </Layout>
        </Router>
      </React.Fragment>
  );
}

export default App;
