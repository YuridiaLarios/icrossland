import React, {Component} from 'react'
import logo from '../logo.svg';
import {Row} from "react-bootstrap";
import SingleUserDiv from "../components/SingleUserDiv"



class Homepage extends Component {
  constructor(props) {
    super(props); // props is an object that has users in it now
    this.state = {
      users: props.users
    };
  }

  render() {
    return (

    <div>
      <img src={logo} className="App-logo" alt="logo" />
            <h1>
              Welcome to React, {this.props.name}
            </h1>
      Do you want to see the profile area?
      {this.props.auth.isAuthenticated() &&
          <div>
            <a href="/secret">Click here</a>
            <div>
            <h4>All users:</h4> 
              <Row>
                {
                  this.props.users.map((item) => {
                  return (
                    <SingleUserDiv key={item.id} item={item} getIndividualUserProfile={this.props.getIndividualUserProfile}></SingleUserDiv>
                  );
                })  
                }
              </Row>
            </div>
          </div>
        
      }
        
      {!this.props.auth.isAuthenticated() &&
        <div>
          <hr />
          Please login first
          <hr />
          <button onClick={this.props.auth.login}>login</button>
        </div>
      }
      </div>
    
    )
  }
}



export default Homepage;
