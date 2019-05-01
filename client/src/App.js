import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Navbar, Button } from 'react-bootstrap';
import {NavigationBar} from './components/NavigationBar';
import {Layout} from './components/Layout';
// import Main from "./components/Main";
import Homepage  from './Homepage';
import Secret from "./components/Secret";
import NotFound from "./components/NotFound"
import Callback from './components/Callback';


class App extends Component {
  render(){
    let mainComponent = ""
      switch(this.props.location){
          case "callback":
            mainComponent = <Callback></Callback>
            break;
      }

    return (
    <div className="App">
      <header >
      <Router>
        <NavigationBar {...this.props}/>
          <Layout>
            <Switch>
            <Route exact path="/" render={props => <Homepage {...this.props} />} />
            <Route path='/secret' render={props => (this.props.auth.isAuthenticated() ? <Secret {...this.props}></Secret> : <Homepage {...this.props}/>)} />
            <Route path='/logout' render={props => <Homepage {...this.props} />} />
            <Route component={NotFound} />
            </Switch>
          </Layout>
      </Router>
      </header>

      {mainComponent}
    </div>
    );
  }
}

export default App;
