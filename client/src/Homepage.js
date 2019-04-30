import React, {Component} from 'react'
import logo from './logo.svg';


class Homepage extends Component {
  render() {
    return (

    <div>
      <img src={logo} className="App-logo" alt="logo" />
            <h1>
              Welcome to React, {this.props.name}
            </h1>
      <h2>Homepage</h2>
      Do you want to see the secret area?
          <a href="/secret">Click here</a>
        
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
