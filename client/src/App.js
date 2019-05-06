import React, {Component} from "react";
import "./App.css";
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import {Layout} from "./components/Layout";
import Homepage  from "./Pages/Homepage";
import Secret from "./Pages/Secret";
import Profile from "./Pages/Profile";
import Profile2 from "./Pages/Profile2";
import UserProfile from "./Pages/userProfile";
import Search from "./components/SearchForm";
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




    // COLLECTING CORRESPONDING USERID AND USERNAME AFTER CLICKING INDIVIDUAL PROFILE BUTTON
    // binds this method to getIndividualUserProfile instance
    getIndividualUserProfile = (currentUser) => {
      console.log("the name is: " + currentUser.username + " the id is: " + currentUser._id);
      this.setState({
        individualUserProfile: currentUser
      })
    // console.log("the name from state is: " + this.state.individualUserProfile.username + "the id from state is: " + this.state.individualUserProfile._id)    
  }
  


  //MAIN ALL USERS UI
  // moving it here makes it accessible to all children components
  componentDidMount() {
      const url = "http://localhost:3000/api/allusers";
      // const url = "/api/allusers";
  
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          this.setState({
            users: data
          })
        })
        .catch((error) => {
          this.setState({
            error: true
          })
        });
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
            
            <Route path='/secret' render={props => this.props.auth.isAuthenticated() ? (<Secret {...this.props}></Secret>) : (<Redirect to ={{ pathname: "/",}}/>)}/>

            <Route path='/profile' render={props => this.props.auth.isAuthenticated() ? (<Profile {...this.props}></Profile>) : (<Redirect to ={{ pathname: "/",}}/>)}/>
          
            <Route path='/userProfile' render={props => (this.props.auth.isAuthenticated() ? <UserProfile {...this.props}></UserProfile> : <Homepage {...this.props}/>)} />
            <Route path="/profile2/:userId" render={props => (this.props.auth.isAuthenticated() ? <Profile2 {...this.props}></Profile2> : <Homepage {...this.props}/>)} />
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
