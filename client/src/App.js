import React, {Component} from "react";
import axios from "axios";
import "./App.css";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import {Layout} from "./components/Layout";
import Homepage  from "./Pages/Homepage";
import Secret from "./Pages/Secret";
import Profile from "./Pages/Profile";
import UserProfile from "./Pages/UserProfile";
import NotFound from "./Pages/NotFound";
import Callback from "./components/Callback";


class App extends Component {

    // CONSTRUCTOR
    constructor(props) {
      super(props);
      this.state = {
        users: [],
        individualUserProfile: {}            
      }
    }

    // function to get the info of an individual user profile
    // binds this method to getIndividualUserProfile instance
    getIndividualUserProfile = (currentUser) => {
      console.log("the name is: " + currentUser.username + " the id is: " + currentUser._id);
      this.setState({
        individualUserProfile: currentUser
      })
    console.log("the name from state is: " + this.state.individualUserProfile.username + "the id from state is: " + this.state.individualUserProfile._id)    
  }
  


  //MAIN ALL USERS UI
  // moving it here makes it accessible to all children components
  componentDidMount() {
    const {getAccessToken} = this.props.auth;
    console.log(this.props.auth.getAccessToken);
    const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    // axios.get("http://localhost:3000/api/allusers", { headers })
    axios.get("/api/allUsers", { headers })
      .then(response => this.setState({ users: response.data }))
      .catch(error => this.setState({ error: true}));
  }

  
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
      <BrowserRouter>
        <NavigationBar {...this.props}/>
          <Layout>
            <Switch>
            <Route exact path="/" render={props => <Homepage users={this.state.users}  {...this.props} getIndividualUserProfile={this.getIndividualUserProfile} />} />
            
            <Route path='/secret' render={props => this.props.auth.isAuthenticated() ? (<Secret users={this.state.users} {...this.props} getIndividualUserProfile={this.props.getIndividualUserProfile}></Secret>) : (<Redirect to ={{ pathname: "/",}}/>)}/>

            <Route path='/profile' render={props => this.props.auth.isAuthenticated() ? (<Profile {...this.props}></Profile>) : (<Redirect to ={{ pathname: "/",}}/>)}/>

            <Route path="/userProfile/:userId" render={props => (this.props.auth.isAuthenticated() ? <UserProfile {...this.props} user={this.state.individualUserProfile}></UserProfile> : <Homepage {...this.props}/>)} />

            <Route path='/logout' render={props => (this.props.auth.isAuthenticated() ? <Homepage {...this.props}></Homepage> : <Homepage {...this.props}/>)} />
            
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
