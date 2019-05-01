import React, {Component} from "react";
import {Button} from "react-bootstrap";
import axios from 'axios';



class Secret extends Component {
  componentWillMount() {
    this.setState({ 
      pingMessage: '',
      pingSecuredMessage: ''
  });
  }

  securedPing() {
    // const { getAccessToken } = this.props.auth;
    // const headers = { 'Authorization': `Bearer ${getAccessToken()}`}
    // axios.get(`http://localhost:3000/api/private`, { headers })
    // axios.get("http://localhost:3000/api/private")
    axios.get("/api/private")
      .then(response => this.setState({ pingSecuredMessage: response.data.message }))
      .catch(error => this.setState({ pingSecuredMessage: error.message }));
  }

  ping() {
    // axios.get("http://localhost:3000/api/public")
      axios.get("/api/public")
      .then(response => this.setState({ pingMessage: response.data.message }))
      .catch(error => this.setState({ pingMessage: error.message }));  
  }

  render() {
    return (
      <div>
        <h1>This is a super secret area. Jump back to <a href="/">Home</a></h1>
        <br />
        <button onClick={this.props.auth.logout}>Logout</button>

        <div className="container">
        <h3>Make a Call to the Server</h3>
        <Button  onClick={this.ping.bind(this)}>Ping</Button>              
        <h2> {this.state.pingMessage}</h2>
        <Button onClick={this.securedPing.bind(this)}>
                Call Private
        </Button>       
        <h2> {this.state.pingSecuredMessage}</h2>
      </div>
      </div>
    )
  }
}


export default Secret;